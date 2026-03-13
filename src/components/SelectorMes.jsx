// src/components/SelectorMes.jsx
import { nombreMes, mesActual, mesAnterior, mesSiguiente } from "../constants/utils";

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "12px 16px",
    background: "#14142A",
    borderBottom: "1px solid #2A2A4A",
  },
  btn: {
    background: "#1E1E3A",
    border: "1px solid #3A3A6A",
    borderRadius: 8,
    color: "#A0A0D0",
    fontSize: 18,
    width: 36,
    height: 36,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s",
  },
  btnDisabled: {
    opacity: 0.3,
    cursor: "default",
  },
  label: {
    fontSize: 15,
    fontWeight: 700,
    color: "#E8E8F0",
    minWidth: 160,
    textAlign: "center",
  },
  anio: {
    fontSize: 12,
    color: "#6060A0",
    marginLeft: 6,
    fontWeight: 400,
  },
};

export default function SelectorMes({ periodo, setPeriodo }) {
  const actual = mesActual();
  const esMesActual =
    periodo.anio === actual.anio && periodo.mes === actual.mes;

  const irAtras    = () => setPeriodo(mesAnterior(periodo));
  const irAdelante = () => { if (!esMesActual) setPeriodo(mesSiguiente(periodo)); };

  return (
    <div style={styles.wrapper}>
      <button onClick={irAtras} style={styles.btn} title="Mes anterior">
        ←
      </button>
      <span style={styles.label}>
        📅 {nombreMes(periodo.mes)}
        <span style={styles.anio}>{periodo.anio}</span>
      </span>
      <button
        onClick={irAdelante}
        style={{ ...styles.btn, ...(esMesActual ? styles.btnDisabled : {}) }}
        title={esMesActual ? "Este es el mes actual" : "Mes siguiente"}
        disabled={esMesActual}
      >
        →
      </button>
    </div>
  );
}