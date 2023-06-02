import "./CustomModal.css";

const CustomModal = ({ isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
