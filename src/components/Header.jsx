// src/components/Header.jsx
import { styles } from "../styles/styles";
import { formatCOP } from "../constants/utils";

export default function Header({ totales, vista, setVista }) {
  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        {/* Título */}
        <div>
          <div style={styles.headerTag}>Control Financiero</div>
          <h1 style={styles.headerTitle}>🏍️ MotoGains</h1>
          <p style={styles.headerSub}>DiDi Food · InDrive</p>
        </div>

        {/* Balance neto del período */}
        <div style={styles.netoBox}>
          <span style={styles.netoLabel}>
            Neto {vista === "dia" ? "hoy" : vista}
          </span>
          <span
            style={{
              ...styles.netoVal,
              color: totales.neto >= 0 ? "#69F0AE" : "#FF5252",
            }}
          >
            {formatCOP(totales.neto)}
          </span>
        </div>
      </div>

      {/* Selector de período */}
      <div style={styles.vistaTabs}>
        {["dia", "semana", "mes"].map((v) => (
          <button
            key={v}
            onClick={() => setVista(v)}
            style={{
              ...styles.vistaBtn,
              ...(vista === v ? styles.vistaBtnActive : {}),
            }}
          >
            {v === "dia" ? "Hoy" : v === "semana" ? "Semana" : "Mes"}
          </button>
        ))}
      </div>
    </header>
  );
}
