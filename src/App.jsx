// src/App.jsx
import { useState, useMemo } from "react";
import { CATEGORIES } from "./constants/categories";
import { mesActual } from "./constants/utils";
import { useRegistros } from "./hooks/useRegistros";
import { useAuth } from "./hooks/useAuth";
import { styles } from "./styles/styles";

import Login        from "./components/Login";
import Header       from "./components/Header";
import StatsCards   from "./components/StatsCards";
import MainTabs     from "./components/MainTabs";
import SelectorMes  from "./components/SelectorMes";
import Toast        from "./components/Toast";
import ConfirmModal from "./components/ConfirmModal";
import Resumen      from "./components/pages/Resumen";
import AgregarForm  from "./components/pages/AgregarForm";
import Historial    from "./components/pages/Historial";

export default function App() {
  const { usuario, cargando: cargandoAuth, cerrarSesion } = useAuth();

  const [vista,   setVista]   = useState("mes");
  const [tab,     setTab]     = useState("resumen");
  const [periodo, setPeriodo] = useState(mesActual());

  const {
    registros, cargando, form, editId, toast,
    confirmDelete, setConfirmDelete,
    updateForm, handleSubmit, handleEdit, handleDelete, cancelEdit,
  } = useRegistros(vista, periodo);

  const totales = useMemo(() => {
    const ganancias = registros
      .filter((r) => CATEGORIES[r.categoria].tipo === "ganancia")
      .reduce((s, r) => s + r.monto, 0);
    const gastos = registros
      .filter((r) => CATEGORIES[r.categoria].tipo === "gasto")
      .reduce((s, r) => s + r.monto, 0);
    return { ganancias, gastos, neto: ganancias - gastos };
  }, [registros]);

  const porCategoria = useMemo(() => {
    const map = {};
    registros.forEach((r) => {
      if (!map[r.categoria]) map[r.categoria] = 0;
      map[r.categoria] += r.monto;
    });
    return map;
  }, [registros]);

  const onEditRegistro = (registro) => {
    handleEdit(registro);
    setTab("agregar");
  };

  // Mientras verifica si hay sesión activa
  if (cargandoAuth) {
    return (
      <div style={{ minHeight: "100vh", background: "#0D0D1A", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#6060A0", fontSize: 14 }}>Cargando...</span>
      </div>
    );
  }

  // Si no hay sesión, mostrar login
  if (!usuario) return <Login />;

  return (
    <div style={styles.root}>
      <Header
        totales={totales}
        vista={vista}
        setVista={setVista}
        periodo={periodo}
        usuario={usuario}
        cerrarSesion={cerrarSesion}
      />

      {vista === "mes" && (
        <SelectorMes periodo={periodo} setPeriodo={setPeriodo} />
      )}

      <StatsCards totales={totales} />

      <MainTabs
        tab={tab}
        setTab={setTab}
        editId={editId}
        cancelEdit={cancelEdit}
      />

      <div style={styles.content}>
        {cargando ? (
          <div style={styles.loading}>Cargando registros...</div>
        ) : (
          <>
            {tab === "resumen" && <Resumen porCategoria={porCategoria} />}
            {tab === "agregar" && (
              <AgregarForm
                form={form}
                editId={editId}
                updateForm={updateForm}
                handleSubmit={handleSubmit}
                cancelEdit={cancelEdit}
                setTab={setTab}
              />
            )}
            {tab === "historial" && (
              <Historial
                filtrados={registros}
                vista={vista}
                periodo={periodo}
                onEdit={onEditRegistro}
                onDeleteRequest={setConfirmDelete}
              />
            )}
          </>
        )}
      </div>

      <ConfirmModal
        confirmDelete={confirmDelete}
        onCancel={() => setConfirmDelete(null)}
        onConfirm={handleDelete}
      />
      <Toast toast={toast} />
    </div>
  );
}
