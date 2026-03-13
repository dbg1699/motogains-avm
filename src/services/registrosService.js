// src/services/registrosService.js
import { db } from "./firebase";
import {
  ref, push, update, remove, onValue,
  query, orderByChild, startAt, endAt,
} from "firebase/database";

export const fechaHoy = () => new Date().toISOString().split("T")[0];

// ── CREATE ────────────────────────────────────────────────────
export const agregarRegistro = (uid, datos) => {
  const registrosRef = ref(db, `registros/${uid}`);
  return push(registrosRef, {
    categoria:      datos.categoria,
    tipo:           datos.tipo,
    monto:          Number(datos.monto),
    nota:           datos.nota || "",
    fecha:          datos.fecha,
    creado_en:      Date.now(),
    actualizado_en: Date.now(),
  });
};

// ── UPDATE ────────────────────────────────────────────────────
export const actualizarRegistro = (uid, registroId, datos) => {
  const registroRef = ref(db, `registros/${uid}/${registroId}`);
  return update(registroRef, {
    categoria:      datos.categoria,
    tipo:           datos.tipo,
    monto:          Number(datos.monto),
    nota:           datos.nota || "",
    fecha:          datos.fecha,
    actualizado_en: Date.now(),
  });
};

// ── DELETE ────────────────────────────────────────────────────
export const eliminarRegistro = (uid, registroId) => {
  return remove(ref(db, `registros/${uid}/${registroId}`));
};

// ── READ en tiempo real ───────────────────────────────────────
export const escucharRegistros = (uid, desde, hasta, callback) => {
  const dbRef = ref(db, `registros/${uid}`);
  const q = query(
    dbRef,
    orderByChild("fecha"),
    startAt(desde),
    endAt(hasta)
  );

  const unsubscribe = onValue(q, (snapshot) => {
    const datos = [];
    snapshot.forEach((child) => {
      datos.push({ id: child.key, ...child.val() });
    });
    datos.sort((a, b) => b.creado_en - a.creado_en);
    callback(datos);
  });

  return unsubscribe;
};