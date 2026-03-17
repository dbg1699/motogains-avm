import { useState } from "react";
import { nombreMes, mesActual } from "../constants/utils";

const generarAnios = () => {
  const actual = new Date().getFullYear();
  const anios = [];
  for (let a = actual; a >= 2023; a--) {
    anios.push(a);
  }
  return anios;
};

const MESES = [
  "Ene", "Feb", "Mar", "Abr",
  "May", "Jun", "Jul", "Ago",
  "Sep", "Oct", "Nov", "Dic",
];

export default function SelectorMes({ periodo, setPeriodo }) {
  const [abierto, setAbierto] = useState(false);
  const actual = mesActual();
  const anios  = generarAnios();

  const seleccionarMes = (mes) => {
    if (
      periodo.anio > actual.anio ||
      (periodo.anio === actual.anio && mes > actual.mes)
    ) return;
    setPeriodo({ anio: periodo.anio, mes });
    setAbierto(false);
  };

  const cambiarAnio = (e) => {
    const nuevoAnio = Number(e.target.value);
    if (nuevoAnio === actual.anio && periodo.mes > actual.mes) {
      setPeriodo({ anio: nuevoAnio, mes: actual.mes });
    } else {
      setPeriodo({ anio: nuevoAnio, mes: periodo.mes });
    }
  };

  const esMesFuturo     = (mes) => periodo.anio > actual.anio || (periodo.anio === actual.anio && mes > actual.mes);
  const esMesActual     = (mes) => periodo.anio === actual.anio && mes === actual.mes;
  const esMesSeleccionado = (mes) => mes === periodo.mes;

  return (
    <div style={{ position: "relative", padding: "0 16px", background: "#14142A", borderBottom: "1px solid #2A2A4A" }}>

      {/* Botón principal */}
      <button
        onClick={() => setAbierto((a) => !a)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: "12px 0", background: "transparent", border: "none", cursor: "pointer" }}
      >
        <span style={{ fontSize: 16 }}>📅</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#E8E8F0" }}>
          {nombreMes(periodo.mes)}
          <span style={{ fontSize: 13, color: "#6060A0", fontWeight: 400, marginLeft: 6 }}>{periodo.anio}</span>
        </span>
        <span style={{ fontSize: 12, color: "#6060A0", transform: abierto ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>▼</span>
      </button>

      {/* Panel desplegable */}
      {abierto && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1A1A30", border: "1px solid #3A3A6A", borderTop: "none", borderRadius: "0 0 14px 14px", padding: "14px", zIndex: 50, boxShadow: "0 8px 24px rgba(0,0,0,0.4)" }}>

          {/* Selector de año */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: 11, color: "#6060A0", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Año</span>
            <select
              value={periodo.anio}
              onChange={cambiarAnio}
              style={{ background: "#14142A", border: "1px solid #3A3A6A", borderRadius: 8, color: "#E8E8F0", fontSize: 14, fontWeight: 700, padding: "6px 10px", cursor: "pointer", outline: "none" }}
            >
              {anios.map((a) => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          {/* Cuadrícula de meses */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
            {MESES.map((nombre, i) => {
              const mes       = i + 1;
              const futuro    = esMesFuturo(mes);
              const esHoy     = esMesActual(mes);
              const seleccion = esMesSeleccionado(mes);

              return (
                <button
                  key={mes}
                  onClick={() => seleccionarMes(mes)}
                  disabled={futuro}
                  style={{
                    padding: "10px 4px",
                    borderRadius: 8,
                    border: seleccion ? "1px solid #9B85FF" : esHoy ? "1px solid #7B68EE" : "1px solid transparent",
                    background: seleccion ? "#7B68EE" : "#14142A",
                    color: seleccion ? "#fff" : esHoy ? "#A090FF" : "#A0A0C0",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: futuro ? "default" : "pointer",
                    opacity: futuro ? 0.3 : 1,
                    transition: "all 0.15s",
                    textAlign: "center",
                  }}
                >
                  {nombre}
                </button>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
}