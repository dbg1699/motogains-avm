// src/components/pages/Resumen.jsx
import { styles } from "../../styles/styles";
import { CATEGORIES } from "../../constants/categories";
import { formatCOP } from "../../constants/utils";
import SectionTitle from "../SectionTitle";

export default function Resumen({ porCategoria }) {
  const hayDatos = Object.entries(porCategoria).length > 0;
  const maxVal = hayDatos ? Math.max(...Object.values(porCategoria)) : 1;

  return (
    <div>
      {/* ── Tarjetas por categoría ── */}
      <SectionTitle>Por plataforma / categoría</SectionTitle>
      <div style={styles.catGrid}>
        {!hayDatos && (
          <p style={styles.empty}>Sin registros en este período</p>
        )}
        {Object.entries(porCategoria).map(([cat, total]) => {
          const info = CATEGORIES[cat];
          return (
            <div
              key={cat}
              style={{ ...styles.catCard, borderLeft: `4px solid ${info.color}` }}
            >
              <span style={styles.catEmoji}>{info.emoji}</span>
              <div>
                <div style={styles.catName}>{info.label}</div>
                <div
                  style={{
                    ...styles.catTotal,
                    color: info.tipo === "ganancia" ? "#69F0AE" : "#FF7070",
                  }}
                >
                  {info.tipo === "ganancia" ? "+" : "-"}
                  {formatCOP(total)}
                </div>
              </div>
              <span
                style={{
                  ...styles.catBadge,
                  background: info.tipo === "ganancia" ? "#1B4332" : "#4A1010",
                  color: info.tipo === "ganancia" ? "#69F0AE" : "#FF7070",
                }}
              >
                {info.tipo}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Gráfica de barras ── */}
      {hayDatos && (
        <>
          <SectionTitle>Distribución visual</SectionTitle>
          <div style={styles.barChart}>
            {Object.entries(porCategoria).map(([cat, total]) => {
              const info = CATEGORIES[cat];
              const pct = (total / maxVal) * 100;
              return (
                <div key={cat} style={styles.barRow}>
                  <span style={styles.barLabel}>
                    {info.emoji} {info.label}
                  </span>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${info.color}, ${info.accent})`,
                      }}
                    />
                  </div>
                  <span style={styles.barAmt}>{formatCOP(total)}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
