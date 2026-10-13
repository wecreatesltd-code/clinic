export default function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="toast-notification">
      <div className="toast-content">
        <span className="toast-icon">✨</span>
        <span className="toast-message">{message}</span>
      </div>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        ✕
      </button>
    </div>
  );
}
