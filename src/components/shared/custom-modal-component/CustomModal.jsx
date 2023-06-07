import { FaWindowClose } from "react-icons/fa";
import "./CustomModal.css";

const CustomModal = ({ isOpen, onClose, children, showCloseButton = true }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        {showCloseButton && (
          <span onClick={onClose} className="modal-close-btn">
            <FaWindowClose />
          </span>
        )}
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default CustomModal;
