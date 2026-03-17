// src/components/pages/Historial.jsx
import { useState, useEffect } from "react";
import { styles } from "../../styles/styles";
import { CATEGORIES } from "../../constants/categories";
import { formatCOP, nombreMes } from "../../constants/utils";
import SectionTitle from "../SectionTitle";

const POR_PAGINA = 6;

export default function Historial({ filtrados, vista, periodo, onEdit, onDeleteRequest }) {
  const [pagina, setPagina] = useState(1);

  // Resetea a página 1 cuando cambia el período
  useEffect(() => {
    setPagina(1);
  }, [vista, periodo.anio, periodo.mes]);

  const periodoLabel = () => {
    if (vista === "dia")    return "hoy";
    if (vista === "semana") return "esta semana";
    return `${nombreMes(periodo.mes)} ${periodo.anio}`;
  };

  const totalPaginas  = Math.ceil(filtrados.length / POR_PAGINA);
  const inicio        = (pagina - 1) * POR_PAGINA;
  const fin           = inicio + POR_PAGINA;
  const registrosPagina = filtrados.slice(inicio, fin);

  return (
    <div>
      <SectionTitle>
        {filtrados.length} registro{filtrados.length !== 1 ? "s" : ""} — {periodoLabel()}
      </SectionTitle>

      {filtrados.length === 0 && (
        <p style={styles.empty}>Sin registros en este período</p>
      )}

      {/* Lista de registros */}
      {registrosPagina.map((r) => {
        const info = CATEGORIES[r.categoria];
        return (
          <div key={r.id} style={styles.registro}>
            <div style={{ ...styles.regAccent, background: info.color }} />
            <div style={styles.regEmoji}>{info.emoji}</div>
            <div style={styles.regInfo}>
              <div style={styles.regCat}>{info.label}</div>
              {r.nota && <div style={styles.regNota}>{r.nota}</div>}
              <div style={styles.regFecha}>📅 {r.fecha}</div>
            </div>
            <div style={styles.regRight}>
              <div style={{
                ...styles.regMonto,
                color: info.tipo === "ganancia" ? "#69F0AE" : "#FF7070",
              }}>
                {info.tipo === "ganancia" ? "+" : "-"}{formatCOP(r.monto)}
              </div>
              <div style={styles.regActions}>
                <button onClick={() => onEdit(r)} style={styles.editBtn}>✏️</button>
                <button onClick={() => onDeleteRequest(r.id)} style={styles.deleteBtn}>🗑️</button>
              </div>
            </div>
          </div>
        );
      })}

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div style={paginaStyles.wrapper}>

          {/* Botón anterior */}
          <button
            onClick={() => setPagina((p) => p - 1)}
            disabled={pagina === 1}
            style={{
              ...paginaStyles.btn,
              ...(pagina === 1 ? paginaStyles.btnDisabled : {}),
            }}
          >
            ←
          </button>

          {/* Números de página */}
          <div style={paginaStyles.nums}>
            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPagina(n)}
                style={{
                  ...paginaStyles.num,
                  ...(n === pagina ? paginaStyles.numActivo : {}),
                }}
              >
                {n}
              </button>
            ))}
          </div>

          {/* Botón siguiente */}
          <button
            onClick={() => setPagina((p) => p + 1)}
            disabled={pagina === totalPaginas}
            style={{
              ...paginaStyles.btn,
              ...(pagina === totalPaginas ? paginaStyles.btnDisabled : {}),
            }}
          >
            →
          </button>
        </div>
      )}

      {/* Indicador de página */}
      {totalPaginas > 1 && (
        <div style={paginaStyles.indicador}>
          Página {pagina} de {totalPaginas} · mostrando {registrosPagina.length} de {filtrados.length} registros
        </div>
      )}
    </div>
  );
}

const paginaStyles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 20,
    paddingTop: 16,
    borderTop: "1px solid #2A2A4A",
  },
  btn: {
    background: "#14142A",
    border: "1px solid #3A3A6A",
    borderRadius: 8,
    color: "#A0A0D0",
    fontSize: 16,
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
  nums: {
    display: "flex",
    gap: 4,
  },
  num: {
    background: "#14142A",
    border: "1px solid #2A2A4A",
    borderRadius: 8,
    color: "#6060A0",
    fontSize: 13,
    fontWeight: 600,
    width: 32,
    height: 36,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  numActivo: {
    background: "#7B68EE",
    borderColor: "#7B68EE",
    color: "#fff",
  },
  indicador: {
    textAlign: "center",
    fontSize: 11,
    color: "#4040A0",
    marginTop: 10,
    letterSpacing: 0.3,
  },
};