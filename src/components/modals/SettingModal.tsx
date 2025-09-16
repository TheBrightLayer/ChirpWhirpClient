import React from "react";

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h3>Settings</h3>
        <p>Settings content goes here.</p>
        <button onClick={onClose} className="close-btn">
          Close
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
