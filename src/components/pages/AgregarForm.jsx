// src/components/pages/AgregarForm.jsx
import { styles } from "../../styles/styles";
import { CATEGORIES } from "../../constants/categories";
import SectionTitle from "../SectionTitle";

export default function AgregarForm({
  form,
  editId,
  updateForm,
  handleSubmit,
  cancelEdit,
  setTab,
}) {
  const gananciaCats = Object.entries(CATEGORIES).filter(
    ([, v]) => v.tipo === "ganancia"
  );
  const gastoCats = Object.entries(CATEGORIES).filter(
    ([, v]) => v.tipo === "gasto"
  );

  const onSubmit = () => {
    const ok = handleSubmit();
    // Si se agregó correctamente (no fue error de validación), ir al historial
    if (ok) setTab("historial");
  };

  return (
    <div style={styles.formBox}>
      {/* Banner de edición */}
      {editId && (
        <div style={styles.editBanner}>
          ✏️ Editando registro —{" "}
          <button onClick={cancelEdit} style={styles.cancelLink}>
            Cancelar
          </button>
        </div>
      )}

      {/* Tipo de registro */}
      <SectionTitle>Tipo de registro</SectionTitle>

      <div style={styles.catGroupLabel}>💰 Ganancias</div>
      <div style={styles.catSelect}>
        {gananciaCats.map(([key, info]) => (
          <button
            key={key}
            onClick={() => updateForm("categoria", key)}
            style={{
              ...styles.catBtn,
              borderColor: form.categoria === key ? info.color : "transparent",
              background:
                form.categoria === key ? `${info.color}22` : "#1A1A2E",
            }}
          >
            <span>{info.emoji}</span>
            <span style={styles.catBtnLabel}>{info.label}</span>
          </button>
        ))}
      </div>

      <div style={{ ...styles.catGroupLabel, marginTop: 12 }}>💸 Gastos</div>
      <div style={styles.catSelect}>
        {gastoCats.map(([key, info]) => (
          <button
            key={key}
            onClick={() => updateForm("categoria", key)}
            style={{
              ...styles.catBtn,
              borderColor: form.categoria === key ? info.color : "transparent",
              background:
                form.categoria === key ? `${info.color}22` : "#1A1A2E",
            }}
          >
            <span>{info.emoji}</span>
            <span style={styles.catBtnLabel}>{info.label}</span>
          </button>
        ))}
      </div>

      {/* Monto */}
      <SectionTitle>Monto (COP $)</SectionTitle>
      <input
        type="number"
        placeholder="Ej: 45000"
        value={form.monto}
        onChange={(e) => updateForm("monto", e.target.value)}
        style={styles.input}
      />

      {/* Fecha */}
      <SectionTitle>Fecha</SectionTitle>
      <input
        type="date"
        value={form.fecha}
        onChange={(e) => updateForm("fecha", e.target.value)}
        style={styles.input}
      />

      {/* Nota */}
      <SectionTitle>Nota (opcional)</SectionTitle>
      <input
        type="text"
        placeholder="Ej: Turno de la mañana"
        value={form.nota}
        onChange={(e) => updateForm("nota", e.target.value)}
        style={styles.input}
      />

      {/* Botón */}
      <button onClick={onSubmit} style={styles.submitBtn}>
        {editId ? "💾 Guardar cambios" : "➕ Agregar registro"}
      </button>
    </div>
  );
}
