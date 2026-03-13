// src/constants/categories.js
// ─────────────────────────────────────────────────────────────
// Aquí defines todas las categorías de gastos e ingresos.
// Para añadir una nueva, copia uno de los bloques y ajusta los valores.
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = {
  // ── GANANCIAS ──────────────────────────────────────────────
  didi: {
    label: "DiDi Food",
    color: "#FF6B2B",
    accent: "#FF8C55",
    emoji: "🍔",
    tipo: "ganancia",
  },
  indrive_viaje: {
    label: "InDrive Viajes",
    color: "#00C853",
    accent: "#69F0AE",
    emoji: "🚗",
    tipo: "ganancia",
  },
  otro_ingreso: {
    label: "Otro Ingreso",
    color: "#26C6DA",
    accent: "#80DEEA",
    emoji: "💵",
    tipo: "ganancia",
  },

  // ── GASTOS ─────────────────────────────────────────────────
  indrive_consigna: {
    label: "InDrive Consigna",
    color: "#448AFF",
    accent: "#82B1FF",
    emoji: "💰",
    tipo: "gasto",
  },
  gasolina: {
    label: "Gasolina",
    color: "#FF4444",
    accent: "#FF8080",
    emoji: "⛽",
    tipo: "gasto",
  },
  mantenimiento: {
    label: "Mantenimiento",
    color: "#FF9800",
    accent: "#FFB74D",
    emoji: "🔧",
    tipo: "gasto",
  },
  comida: {
    label: "Comida",
    color: "#E040FB",
    accent: "#EA80FC",
    emoji: "🥗",
    tipo: "gasto",
  },
  otro_gasto: {
    label: "Otro Gasto",
    color: "#78909C",
    accent: "#B0BEC5",
    emoji: "📌",
    tipo: "gasto",
  },
};
