import { BaseEditor } from "slate";
import { ReactEditor } from "slate-react";
import { HistoryEditor } from "slate-history";

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
};

export type ParagraphElement = { type: "paragraph"; children: CustomText[] };
export type HeadingOneElement = { type: "heading-one"; children: CustomText[] };
export type HeadingTwoElement = { type: "heading-two"; children: CustomText[] };
export type BlockQuoteElement = { type: "block-quote"; children: CustomText[] };
export type ListItemElement = { type: "list-item"; children: CustomText[] };
export type BulletedListElement = {
  type: "bulleted-list";
  children: ListItemElement[];
};
export type NumberedListElement = {
  type: "numbered-list";
  children: ListItemElement[];
};
export type LinkElement = { type: "link"; url: string; children: CustomText[] };
export type ImageElement = {
  type: "image";
  url: string;
  children: [{ text: "" }];
};

export type CustomElement =
  | ParagraphElement
  | HeadingOneElement
  | HeadingTwoElement
  | BlockQuoteElement
  | ListItemElement
  | BulletedListElement
  | NumberedListElement
  | LinkElement
  | ImageElement;

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
