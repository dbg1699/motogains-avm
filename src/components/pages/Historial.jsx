// src/components/pages/Historial.jsx
import { styles } from "../../styles/styles";
import { CATEGORIES } from "../../constants/categories";
import { formatCOP } from "../../constants/utils";
import SectionTitle from "../SectionTitle";

export default function Historial({
  filtrados,
  vista,
  onEdit,
  onDeleteRequest,
}) {
  const periodoLabel =
    vista === "dia"
      ? "hoy"
      : vista === "semana"
      ? "esta semana"
      : "este mes";

  return (
    <div>
      <SectionTitle>
        {filtrados.length} registro{filtrados.length !== 1 ? "s" : ""} —{" "}
        {periodoLabel}
      </SectionTitle>

      {filtrados.length === 0 && (
        <p style={styles.empty}>Sin registros en este período</p>
      )}

      {/* Lista de registros (más reciente primero) */}
      {[...filtrados].reverse().map((r) => {
        const info = CATEGORIES[r.categoria];
        return (
          <div key={r.id} style={styles.registro}>
            {/* Barra de color lateral */}
            <div style={{ ...styles.regAccent, background: info.color }} />

            <div style={styles.regEmoji}>{info.emoji}</div>

            <div style={styles.regInfo}>
              <div style={styles.regCat}>{info.label}</div>
              {r.nota && <div style={styles.regNota}>{r.nota}</div>}
              <div style={styles.regFecha}>📅 {r.fecha}</div>
            </div>

            <div style={styles.regRight}>
              <div
                style={{
                  ...styles.regMonto,
                  color: info.tipo === "ganancia" ? "#69F0AE" : "#FF7070",
                }}
              >
                {info.tipo === "ganancia" ? "+" : "-"}
                {formatCOP(r.monto)}
              </div>
              <div style={styles.regActions}>
                <button onClick={() => onEdit(r)} style={styles.editBtn}>
                  ✏️
                </button>
                <button
                  onClick={() => onDeleteRequest(r.id)}
                  style={styles.deleteBtn}
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
