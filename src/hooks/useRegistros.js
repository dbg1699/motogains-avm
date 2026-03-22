// src/hooks/useRegistros.js
import { useState, useEffect, useCallback } from "react";
import { CATEGORIES } from "../constants/categories";
import { today, getRango } from "../constants/utils";
import {
  escucharRegistros,
  agregarRegistro,
  actualizarRegistro,
  eliminarRegistro,
} from "../services/registrosService";

const FORM_INICIAL = {
  fecha:     today(),
  categoria: "didi",
  monto:     "",
  nota:      "",
};

// ── ID compartido para la pareja ──────────────────────────────
// Ambos usuarios ven y editan los mismos registros
const ID_COMPARTIDO = "motogains_familia";

export function useRegistros(vista, periodo) {
  const [registros,     setRegistros]     = useState([]);
  const [cargando,      setCargando]      = useState(true);
  const [form,          setForm]          = useState(FORM_INICIAL);
  const [editId,        setEditId]        = useState(null);
  const [toast,         setToast]         = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    setCargando(true);
    const { desde, hasta } = getRango(vista, periodo);

    const unsubscribe = escucharRegistros(
      ID_COMPARTIDO,
      desde,
      hasta,
      (datos) => {
        setRegistros(datos);
        setCargando(false);
      }
    );
    return () => unsubscribe();
  }, [vista, periodo.anio, periodo.mes]);

  const showToast = (msg, type = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const updateForm = useCallback((campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }, []);

  const handleSubmit = async () => {
    if (!form.monto || isNaN(Number(form.monto)) || Number(form.monto) <= 0) {
      showToast("Ingresa un monto válido", "error");
      return false;
    }
    const tipo = CATEGORIES[form.categoria].tipo;
    try {
      if (editId !== null) {
        await actualizarRegistro(ID_COMPARTIDO, editId, { ...form, tipo });
        showToast("Registro actualizado ✓");
        setEditId(null);
      } else {
        await agregarRegistro(ID_COMPARTIDO, { ...form, tipo });
        showToast("Registro añadido ✓");
      }
      setForm(FORM_INICIAL);
      return true;
    } catch (error) {
      console.error("Error:", error);
      showToast("Error al guardar. Intenta de nuevo.", "error");
      return false;
    }
  };

  const handleEdit = useCallback((registro) => {
    setForm({
      fecha:     registro.fecha,
      categoria: registro.categoria,
      monto:     String(registro.monto),
      nota:      registro.nota || "",
    });
    setEditId(registro.id);
  }, []);

  const handleDelete = async (id) => {
    try {
      await eliminarRegistro(ID_COMPARTIDO, id);
      setConfirmDelete(null);
      showToast("Eliminado", "error");
    } catch (error) {
      showToast("Error al eliminar.", "error");
    }
  };

  const cancelEdit = useCallback(() => {
    setEditId(null);
    setForm(FORM_INICIAL);
  }, []);

  return {
    registros, cargando, form, editId, toast,
    confirmDelete, setConfirmDelete,
    updateForm, handleSubmit, handleEdit, handleDelete, cancelEdit,
  };
}