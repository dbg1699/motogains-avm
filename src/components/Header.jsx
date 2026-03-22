// src/components/Header.jsx
import { styles } from "../styles/styles";
import { formatCOP, nombreMes } from "../constants/utils";

export default function Header({ totales, vista, setVista, periodo, usuario, cerrarSesion }) {
  const netoLabel = () => {
    if (vista === "dia")    return "Neto hoy";
    if (vista === "semana") return "Neto semana";
    return `Neto ${nombreMes(periodo.mes)}`;
  };

  return (
    <header style={styles.header}>
      <div style={styles.headerInner}>
        <div>
          <div style={styles.headerTag}>Control Financiero</div>
          <h1 style={styles.headerTitle}>🏍️ MotoGains</h1>
          <p style={styles.headerSub}>DiDi Food · InDrive</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
          {/* Balance neto */}
          <div style={styles.netoBox}>
            <span style={styles.netoLabel}>{netoLabel()}</span>
            <span style={{ ...styles.netoVal, color: totales.neto >= 0 ? "#69F0AE" : "#FF5252" }}>
              {formatCOP(totales.neto)}
            </span>
          </div>

          {/* Usuario + cerrar sesión */}
          <div style={usuarioStyle.wrapper}>
            <span style={usuarioStyle.nombre}>
              👤 {usuario?.displayName || usuario?.email?.split("@")[0]}
            </span>
            <button onClick={cerrarSesion} style={usuarioStyle.btn}>
              Salir
            </button>
          </div>
        </div>
      </div>

      {/* Selector de vista */}
      <div style={styles.vistaTabs}>
        {["dia", "semana", "mes"].map((v) => (
          <button
            key={v}
            onClick={() => setVista(v)}
            style={{ ...styles.vistaBtn, ...(vista === v ? styles.vistaBtnActive : {}) }}
          >
            {v === "dia" ? "Hoy" : v === "semana" ? "Semana" : "Mes"}
          </button>
        ))}
      </div>
    </header>
  );
}

const usuarioStyle = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  nombre: {
    fontSize: 11,
    color: "#6060A0",
    maxWidth: 120,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  btn: {
    background: "#2A1010",
    border: "1px solid #5A2020",
    borderRadius: 6,
    color: "#FF7070",
    fontSize: 11,
    fontWeight: 600,
    padding: "3px 8px",
    cursor: "pointer",
  },
};
