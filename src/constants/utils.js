// src/constants/utils.js

export const formatCOP = (n) =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  }).format(n);

export const today = () => new Date().toISOString().split("T")[0];

export const mesActual = () => {
  const d = new Date();
  return { anio: d.getFullYear(), mes: d.getMonth() + 1 };
};

export const nombreMes = (mes) => {
  const nombres = [
    "Enero","Febrero","Marzo","Abril","Mayo","Junio",
    "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",
  ];
  return nombres[mes - 1];
};

export const inicioDelMes = (anio, mes) =>
  `${anio}-${String(mes).padStart(2, "0")}-01`;

export const finDelMes = (anio, mes) => {
  const ultimo = new Date(anio, mes, 0);
  return ultimo.toISOString().split("T")[0];
};

export const inicioSemana = () => {
  const d = new Date();
  const dia = d.getDay();
  const diff = d.getDate() - dia + (dia === 0 ? -6 : 1);
  return new Date(new Date().setDate(diff)).toISOString().split("T")[0];
};

export const finSemana = () => {
  const lunes = new Date(inicioSemana());
  lunes.setDate(lunes.getDate() + 6);
  return lunes.toISOString().split("T")[0];
};

export const mesAnterior = ({ anio, mes }) => {
  if (mes === 1) return { anio: anio - 1, mes: 12 };
  return { anio, mes: mes - 1 };
};

export const mesSiguiente = ({ anio, mes }) => {
  const actual = mesActual();
  if (anio === actual.anio && mes === actual.mes) return { anio, mes };
  if (mes === 12) return { anio: anio + 1, mes: 1 };
  return { anio, mes: mes + 1 };
};

export const getRango = (vista, periodo) => {
  if (vista === "dia") {
    return { desde: today(), hasta: today() };
  }
  if (vista === "semana") {
    return { desde: inicioSemana(), hasta: finSemana() };
  }
  return {
    desde: inicioDelMes(periodo.anio, periodo.mes),
    hasta: finDelMes(periodo.anio, periodo.mes),
  };
};