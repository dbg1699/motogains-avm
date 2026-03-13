// src/components/Toast.jsx
import { styles } from "../styles/styles";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      style={{
        ...styles.toast,
        background: toast.type === "error" ? "#FF3D00" : "#00C853",
      }}
    >
      {toast.msg}
    </div>
  );
}
