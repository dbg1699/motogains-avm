// src/components/MainTabs.jsx
import { styles } from "../styles/styles";

export default function MainTabs({ tab, setTab, editId, cancelEdit }) {
  const handleTabClick = (t) => {
    setTab(t);
    if (t !== "agregar") cancelEdit();
  };

  const getLabel = (t) => {
    if (t === "resumen") return "📊 Resumen";
    if (t === "agregar") return editId ? "✏️ Editar" : "➕ Agregar";
    return "📋 Historial";
  };

  return (
    <div style={styles.mainTabs}>
      {["resumen", "agregar", "historial"].map((t) => (
        <button
          key={t}
          onClick={() => handleTabClick(t)}
          style={{
            ...styles.mainTab,
            ...(tab === t ? styles.mainTabActive : {}),
          }}
        >
          {getLabel(t)}
        </button>
      ))}
    </div>
  );
}
