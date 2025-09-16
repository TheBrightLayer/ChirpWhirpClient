import React, { useState } from "react";

export default function SettingsPage({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("profile");

  // States
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const token = localStorage.getItem("token");

  // API Handlers
  const handleUpdateProfilePic = async () => {
    if (!profilePic) return alert("Please select a photo!");
    const formData = new FormData();
    formData.append("profilePicture", profilePic);

    const res = await fetch(
      "https://chirpwhirpserver-1.onrender.com//api/profile-picture",
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );
    const data = await res.json();
    alert(data.message || "Profile picture updated!");
  };

  const handleChangePassword = async () => {
    if (!password) return alert("Please enter a new password!");
    const res = await fetch(
      "https://chirpwhirpserver-1.onrender.com//api/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ newPassword: password }),
      }
    );
    const data = await res.json();
    alert(data.message || "Password updated!");
  };

  const handleUpdateEmail = async () => {
    if (!email) return alert("Please enter a new email!");
    const res = await fetch(
      "https://chirpwhirpserver-1.onrender.com//api/update-email",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      }
    );
    const data = await res.json();
    alert(data.message || "Email updated!");
  };

  const handleUpdateName = async () => {
    if (!name) return alert("Please enter your name!");
    const res = await fetch(
      "https://chirpwhirpserver-1.onrender.com//api/update-name",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      }
    );
    const data = await res.json();
    alert(data.message || "Name updated!");
  };

  // 🔥 Reusable Modern Styles
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    marginTop: "8px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.25s ease",
  };

  const buttonStyle: React.CSSProperties = {
    marginTop: "12px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.25s ease",
  };

  const tabButton = (tab: string) => ({
    background: "none",
    border: "none",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    cursor: "pointer",
    padding: "12px 0",
    color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.5)",
    borderBottom:
      activeTab === tab ? "2px solid #0d6efd" : "2px solid transparent",
    transition: "all 0.3s ease",
  });

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          background: "rgba(30,30,30,0.9)",
          borderRadius: "16px",
          width: "440px",
          padding: "28px",
          color: "white",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
          animation: "fadeIn 0.3s ease-in-out",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginBottom: "24px",
          }}
        >
          <button
            style={tabButton("profile")}
            onClick={() => setActiveTab("profile")}
          >
            PROFILE
          </button>
          <button
            style={tabButton("account")}
            onClick={() => setActiveTab("account")}
          >
            ACCOUNT
          </button>
        </div>

        {/* Content */}
        {activeTab === "profile" && (
          <div>
            <label style={{ display: "block", marginBottom: "18px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, opacity: 0.9 }}>
                Update Name
              </span>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={(e) =>
                  (e.currentTarget.style.border = "1px solid #0d6efd")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.border =
                    "1px solid rgba(255,255,255,0.1)")
                }
              />
              <button
                onClick={handleUpdateName}
                style={{
                  ...buttonStyle,
                  background: "#e53945",
                  color: "white",
                }}
              >
                Save
              </button>
            </label>
            <label style={{ display: "block", marginBottom: "18px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, opacity: 0.9 }}>
                Upload Profile Photo
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files?.[0] || null)}
                style={inputStyle}
              />
              <button
                onClick={handleUpdateProfilePic}
                style={{
                  ...buttonStyle,
                  background: "#e53945",
                  color: "white",
                }}
              >
                Upload
              </button>
            </label>
          </div>
        )}

        {activeTab === "account" && (
          <div>
            <label style={{ display: "block", marginBottom: "18px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, opacity: 0.9 }}>
                Change Password
              </span>
              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={handleChangePassword}
                style={{
                  ...buttonStyle,
                  background: "#e53945",
                  color: "white",
                }}
              >
                Update
              </button>
            </label>
            <label style={{ display: "block", marginBottom: "18px" }}>
              <span style={{ fontSize: "13px", fontWeight: 500, opacity: 0.9 }}>
                Update Email
              </span>
              <input
                type="email"
                placeholder="Enter new email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
              />
              <button
                onClick={handleUpdateEmail}
                style={{
                  ...buttonStyle,
                  background: "#e53945",
                  color: "white",
                }}
              >
                Save
              </button>
            </label>
          </div>
        )}

        {/* Close Button */}
        <div style={{ textAlign: "right", marginTop: "30px" }}>
          <button
            onClick={onClose}
            style={{
              ...buttonStyle,
              background: "#e50914",
              color: "white",
              padding: "12px 20px",
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
