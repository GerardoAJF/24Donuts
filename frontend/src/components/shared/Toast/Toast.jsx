import { FaCircleCheck, FaCircleExclamation, FaCircleInfo, FaXmark } from "react-icons/fa6";
import "./Toast.css";

const ICONS = {
  success: FaCircleCheck,
  error: FaCircleExclamation,
  info: FaCircleInfo,
};

function Toast({ type = "info", message, onClose }) {
  const Icon = ICONS[type] || ICONS.info;

  return (
    <div className={`toast toast-${type}`} role="status">
      <Icon size={18} />
      <span className="toast-message">{message}</span>
      <button type="button" className="toast-close" onClick={onClose} aria-label="Cerrar notificación">
        <FaXmark size={14} />
      </button>
    </div>
  );
}

export default Toast;
