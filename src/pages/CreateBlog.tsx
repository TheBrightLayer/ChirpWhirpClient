import React, { useMemo, useState, useCallback } from "react";
import {
  createEditor,
  Transforms,
  Editor,
  Element as SlateElement,
} from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { withHistory } from "slate-history";
import { withHtml } from "../data/withHtml";
import "../styles/CreateBlog.css";

const CATEGORIES = [
  "Technology",
  "Sports",
  "Entertainment",
  "Politics",
  "Finance",
  "Lifestyle",
];
const INITIAL_VALUE = [{ type: "paragraph", children: [{ text: "" }] }];

// ---------- Block Helpers ----------
const LIST_TYPES = ["bulleted-list", "numbered-list"];
const isBlockActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === format,
  });
  return !!match;
};
const toggleBlock = (editor: Editor, format: string) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      LIST_TYPES.includes((n as any).type),
    split: true,
  });
  const newType = isActive ? "paragraph" : isList ? "list-item" : format;
  Transforms.setNodes(editor, { type: newType } as any);
  if (!isActive && isList) {
    const block = { type: format, children: [] } as any;
    Transforms.wrapNodes(editor, block);
  }
};

// ---------- Marks ----------
type Mark = "bold" | "italic" | "underline" | "code";
const isMarkActive = (editor: Editor, format: Mark) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};
const toggleMark = (editor: Editor, format: Mark) => {
  const active = isMarkActive(editor, format);
  if (active) Editor.removeMark(editor, format);
  else Editor.addMark(editor, format, true);
};

// ---------- Links ----------
const isLinkActive = (editor: Editor) =>
  !!Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === "link",
  }).next().value;
const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) &&
      SlateElement.isElement(n) &&
      (n as any).type === "link",
  });
};
const wrapLink = (editor: Editor, url: string) => {
  if (isLinkActive(editor)) unwrapLink(editor);
  const { selection } = editor;
  const isCollapsed =
    selection && selection.anchor.offset === selection.focus.offset;
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  } as any;
  if (isCollapsed) Transforms.insertNodes(editor, link);
  else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

// ---------- Renderers ----------
const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "link":
      return (
        <a {...attributes} href={element.url} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.code) children = <code className="inline-code">{children}</code>;
  return <span {...attributes}>{children}</span>;
};

// ---------- Toolbar ----------
const ToolbarButton: React.FC<{
  active?: boolean;
  title?: string;
  onMouseDown: (e: any) => void;
  children: React.ReactNode;
}> = ({ active, title, onMouseDown, children }) => (
  <button
    type="button"
    className={`create-toolbar-btn ${active ? "is-active" : ""}`}
    title={title}
    onMouseDown={onMouseDown}
  >
    {children}
  </button>
);

const Toolbar: React.FC<{ editor: Editor }> = ({ editor }) => (
  <div className="create-editor-toolbar">
    {/* Marks */}
    <ToolbarButton
      active={isMarkActive(editor, "bold")}
      title="Bold"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "bold");
      }}
    >
      <b>B</b>
    </ToolbarButton>
    <ToolbarButton
      active={isMarkActive(editor, "italic")}
      title="Italic"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "italic");
      }}
    >
      <i>I</i>
    </ToolbarButton>
    <ToolbarButton
      active={isMarkActive(editor, "underline")}
      title="Underline"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "underline");
      }}
    >
      <u>U</u>
    </ToolbarButton>
    <ToolbarButton
      active={isMarkActive(editor, "code")}
      title="Code"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleMark(editor, "code");
      }}
    >
      {"</>"}
    </ToolbarButton>

    <span className="create-toolbar-sep" />

    {/* Blocks */}
    <ToolbarButton
      active={isBlockActive(editor, "heading-one")}
      title="H1"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, "heading-one");
      }}
    >
      H1
    </ToolbarButton>
    <ToolbarButton
      active={isBlockActive(editor, "heading-two")}
      title="H2"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, "heading-two");
      }}
    >
      H2
    </ToolbarButton>
    <ToolbarButton
      active={isBlockActive(editor, "block-quote")}
      title="Blockquote"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, "block-quote");
      }}
    >
      ❝ ❞
    </ToolbarButton>

    <span className="create-toolbar-sep" />

    <ToolbarButton
      active={isBlockActive(editor, "bulleted-list")}
      title="Bulleted List"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, "bulleted-list");
      }}
    >
      • List
    </ToolbarButton>
    <ToolbarButton
      active={isBlockActive(editor, "numbered-list")}
      title="Numbered List"
      onMouseDown={(e) => {
        e.preventDefault();
        toggleBlock(editor, "numbered-list");
      }}
    >
      1. List
    </ToolbarButton>

    <span className="create-toolbar-sep" />

    <ToolbarButton
      active={isLinkActive(editor)}
      title="Insert Link"
      onMouseDown={(e) => {
        e.preventDefault();
        const url = window.prompt("Enter URL:");
        if (url) wrapLink(editor, url);
      }}
    >
      🔗
    </ToolbarButton>
  </div>
);

// ---------- Main Component ----------
const CreateBlog: React.FC = () => {
  const editor = useMemo(
    () => withHtml(withHistory(withReact(createEditor()))),
    []
  );
  const [value, setValue] = useState(INITIAL_VALUE);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDesc, setMetaDesc] = useState("");

  const addTag = useCallback(() => {
    const v = tagInput.trim();
    if (!v) return;
    setTags((t) => (t.includes(v) ? t : [...t, v]));
    setTagInput("");
  }, [tagInput]);
  const removeTag = (t: string) => setTags((all) => all.filter((x) => x !== t));
  const onCoverChange = (file: File | null) => {
    setCover(file);
    if (!file) return setCoverPreview(null);
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("content", JSON.stringify(value));
    formData.append("tags", JSON.stringify(tags));
    formData.append("metaTitle", metaTitle);
    formData.append("metaDesc", metaDesc);
    if (cover) formData.append("cover", cover);

    try {
      const res = await fetch(
        "https://chirpwhirpserver-1.onrender.com//api/blogs/create",
        { method: "POST", body: formData }
      );
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create blog");
      }
      await res.json();
      alert("Blog successfully created!");
      // Reset
      setTitle("");
      setCategory(CATEGORIES[0]);
      setTags([]);
      setTagInput("");
      setCover(null);
      setCoverPreview(null);
      setMetaTitle("");
      setMetaDesc("");
      setValue(INITIAL_VALUE);
    } catch (err: any) {
      console.error(err);
      alert("Failed to create blog: " + err.message);
    }
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (!event.ctrlKey && !event.metaKey) return;
    switch (event.key.toLowerCase()) {
      case "b":
        event.preventDefault();
        toggleMark(editor, "bold");
        break;
      case "i":
        event.preventDefault();
        toggleMark(editor, "italic");
        break;
      case "u":
        event.preventDefault();
        toggleMark(editor, "underline");
        break;
      case "`":
        event.preventDefault();
        toggleMark(editor, "code");
        break;
      case "k":
        event.preventDefault();
        {
          const url = window.prompt("Enter URL:");
          if (url) wrapLink(editor, url);
        }
        break;
    }
  };

  return (
    <div className="create-blog-page">
      <div className="create-blog-card">
        <h1 className="create-blog-title">New Blog</h1>
        <form className="create-blog-form" onSubmit={handleSubmit}>
          {/* Title */}
          <div className="create-form-group">
            <label>Blog Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter your blog title..."
            />
          </div>
          {/* Category */}
          <div className="create-form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          {/* Tags */}
          <div className="create-form-group">
            <label>Tags</label>
            <div className="create-tags-row">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag();
                  }
                }}
                placeholder="Add a tag and press Enter"
              />
              <button type="button" onClick={addTag}>
                + Add
              </button>
            </div>
            <div className="create-chip-container">
              {tags.map((t) => (
                <span key={t} onClick={() => removeTag(t)}>
                  #{t} ✕
                </span>
              ))}
            </div>
          </div>
          {/* Cover */}
          <div className="create-form-group">
            <label>Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => onCoverChange(e.target.files?.[0] || null)}
            />
            {coverPreview && (
              <div className="create-cover-preview">
                <img src={coverPreview} alt="cover preview" />
              </div>
            )}
          </div>
          {/* SEO */}
          <div className="create-form-group">
            <label>Meta Title</label>
            <input
              type="text"
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder="SEO-friendly title"
            />
          </div>
          <div className="create-form-group">
            <label>Meta Description</label>
            <textarea
              value={metaDesc}
              onChange={(e) => setMetaDesc(e.target.value)}
              placeholder="SEO-friendly description"
            />
          </div>
          {/* Editor */}
          <div className="create-form-group">
            <label>Blog Content</label>
            <Slate editor={editor} value={value} onChange={setValue}>
              <Toolbar editor={editor} />
              <Editable
                renderElement={Element}
                renderLeaf={Leaf}
                onKeyDown={onKeyDown}
                placeholder="Write your blog content..."
                className="create-editor"
              />
            </Slate>
          </div>
          <button type="submit" className="create-submit-btn">
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
