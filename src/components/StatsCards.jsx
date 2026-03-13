// src/components/StatsCards.jsx
import { styles } from "../styles/styles";
import { formatCOP } from "../constants/utils";

export default function StatsCards({ totales }) {
  return (
    <div style={styles.statsRow}>
      {/* Ganancias */}
      <div style={{ ...styles.statCard, borderColor: "#69F0AE" }}>
        <span style={styles.statEmoji}>💰</span>
        <span style={styles.statLabel}>Ganancias</span>
        <span style={{ ...styles.statVal, color: "#69F0AE" }}>
          {formatCOP(totales.ganancias)}
        </span>
      </div>

      {/* Gastos */}
      <div style={{ ...styles.statCard, borderColor: "#FF5252" }}>
        <span style={styles.statEmoji}>💸</span>
        <span style={styles.statLabel}>Gastos</span>
        <span style={{ ...styles.statVal, color: "#FF5252" }}>
          {formatCOP(totales.gastos)}
        </span>
      </div>

      {/* Balance */}
      <div
        style={{
          ...styles.statCard,
          borderColor: totales.neto >= 0 ? "#FFD740" : "#FF5252",
        }}
      >
        <span style={styles.statEmoji}>{totales.neto >= 0 ? "📈" : "📉"}</span>
        <span style={styles.statLabel}>Balance</span>
        <span
          style={{
            ...styles.statVal,
            color: totales.neto >= 0 ? "#FFD740" : "#FF5252",
          }}
        >
          {formatCOP(totales.neto)}
        </span>
      </div>
    </div>
  );
}
