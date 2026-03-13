// src/components/ConfirmModal.jsx
import { styles } from "../styles/styles";

export default function ConfirmModal({ confirmDelete, onCancel, onConfirm }) {
  if (!confirmDelete) return null;

  return (
    <div style={styles.overlay} onClick={onCancel}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.modalEmoji}>🗑️</div>
        <div style={styles.modalTitle}>¿Eliminar registro?</div>
        <div style={styles.modalSub}>Esta acción no se puede deshacer</div>
        <div style={styles.modalBtns}>
          <button onClick={onCancel} style={styles.modalCancel}>
            Cancelar
          </button>
          <button onClick={() => onConfirm(confirmDelete)} style={styles.modalConfirm}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
