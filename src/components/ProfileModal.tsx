import React, { useState } from "react";
import "../styles/ProfileModal.css";

interface Props {
  user: any;
  onClose: () => void;
  onLogout: () => void;
  onUpdateUser: (user: any) => void;
}

const ProfileModal: React.FC<Props> = ({
  user,
  onClose,
  onLogout,
  onUpdateUser,
}) => {
  const [username, setUsername] = useState(user.username || "");
  const [profilePhoto, setProfilePhoto] = useState(user.profilePhoto || "");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const updated = { ...user, username, profilePhoto };
    localStorage.setItem("user", JSON.stringify(updated));
    localStorage.setItem("profilePhoto", profilePhoto);

    onUpdateUser(updated);
    onClose();
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal-content">
        <h2>User Profile</h2>

        {/* <div className="profile-photo-section">
          <img
            src={
              profilePhoto || "https://www.w3schools.com/w3images/avatar2.png"
            }
            alt="Profile"
            className="profile-photo"
          />
          <input type="file" accept="image/*" onChange={handleFileUpload} />
        </div> */}

        <div className="profile-photo-section">
          <img
            src={
              profilePhoto || "https://www.w3schools.com/w3images/avatar2.png"
            }
            alt="Profile"
            className="profile-photo"
          />

          <label className="custom-file-label">
            Choose File
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </label>
        </div>

        <input
          type="text"
          placeholder="Set username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="profile-input"
        />

        <div className="profile-actions">
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
          <button className="logout-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
