import React from "react";

interface ProfileModalWrapperProps {
  user: any;
  onClose: () => void;
  onLogout: () => void;
  onUpdateUser: (user: any) => void;
}

const ProfileModalWrapper: React.FC<ProfileModalWrapperProps> = ({ user, onClose, onLogout, onUpdateUser }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Profile</h3>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
        <button onClick={onLogout}>Logout</button>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default ProfileModalWrapper;
