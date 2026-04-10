// src/components/Login.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { iniciarSesion, iniciarSesionGoogle, registrarse } = useAuth();

  const [email,         setEmail]         = useState("");
  const [password,      setPassword]      = useState("");
  const [error,         setError]         = useState("");
  const [cargando,      setCargando]      = useState(false);
  const [verPassword,   setVerPassword]   = useState(false); // ← nuevo

  const handleSubmit = async () => {
    if (!email || !password) { setError("Por favor completa todos los campos."); return; }
    
    setCargando(true); setError("");
    try {
     await iniciarSesion(email, password);
    } catch (e) {
      setError(traducirError(e.code));
    } finally { setCargando(false); }
  };

  const handleGoogle = async () => {
    setCargando(true); setError("");
    try { await iniciarSesionGoogle(); }
    catch (e) { setError(traducirError(e.code)); }
    finally { setCargando(false); }
  };

  const traducirError = (code) => {
    const errores = {
      "auth/user-not-found":       "No existe una cuenta con este correo.",
      "auth/wrong-password":       "Contraseña incorrecta.",
      "auth/email-already-in-use": "Este correo ya está registrado.",
      "auth/invalid-email":        "El correo no es válido.",
      "auth/weak-password":        "La contraseña debe tener al menos 6 caracteres.",
      "auth/too-many-requests":    "Demasiados intentos. Intenta más tarde.",
      "auth/invalid-credential":   "Correo o contraseña incorrectos.",
    };
    return errores[code] || "Ocurrió un error. Intenta de nuevo.";
  };

  return (
    <div style={s.overlay}>
      <div style={s.card}>

        <div style={s.header}>
          <div style={s.logo}>🏍️</div>
          <h1 style={s.title}>MotoGains</h1>
          <p style={s.subtitle}>Control financiero para tu moto</p>
        </div>

        <div style={s.form}>
        
          <input type="email" placeholder="Correo electrónico" value={email}
            onChange={(e) => setEmail(e.target.value)} style={s.input} />

          {/* Campo contraseña con ojo */}
          <div style={s.passwordWrapper}>
            <input
              type={verPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={s.inputPassword}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
            <button
              type="button"
              onClick={() => setVerPassword((v) => !v)}
              style={s.eyeBtn}
              title={verPassword ? "Ocultar contraseña" : "Ver contraseña"}
            >
              {verPassword ? "🙈" : "👁️"}
            </button>
          </div>

          {error && <div style={s.error}>{error}</div>}

          <button onClick={handleSubmit} disabled={cargando}
            style={{ ...s.btnPrimary, opacity: cargando ? 0.7 : 1 }}>
            <p>Iniciar sesión</p>
          </button>

         
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    minHeight: "100vh", background: "#0D0D1A",
    display: "flex", alignItems: "center", justifyContent: "center", padding: "20px",
  },
  card: {
    background: "#14142A", border: "1px solid #2A2A4A",
    borderRadius: 20, padding: "32px 28px", width: "100%",
    maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
  },
  header: { textAlign: "center", marginBottom: 24 },
  logo: { fontSize: 48, marginBottom: 8 },
  title: { margin: 0, fontSize: 26, fontWeight: 800, color: "#fff", letterSpacing: -0.5 },
  subtitle: { margin: "6px 0 0", fontSize: 13, color: "#6060A0" },
  tabs: {
    display: "flex", background: "#0D0D1A",
    borderRadius: 10, padding: 4, marginBottom: 20, gap: 4,
  },
  tab: {
    flex: 1, padding: "8px 0", border: "none", borderRadius: 8,
    background: "transparent", color: "#6060A0",
    fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.2s",
  },
  tabActivo: { background: "#1E1E3A", color: "#E8E8F0" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: {
    background: "#0D0D1A", border: "1px solid #2A2A4A",
    borderRadius: 10, padding: "12px 14px", color: "#E8E8F0",
    fontSize: 14, outline: "none", width: "100%", boxSizing: "border-box",
  },
  // ── Campo contraseña con ojo ──────────────────────────────
  passwordWrapper: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputPassword: {
    background: "#0D0D1A", border: "1px solid #2A2A4A",
    borderRadius: 10, padding: "12px 44px 12px 14px",
    color: "#E8E8F0", fontSize: 14, outline: "none",
    width: "100%", boxSizing: "border-box",
  },
  eyeBtn: {
    position: "absolute", right: 10,
    background: "none", border: "none",
    cursor: "pointer", fontSize: 16,
    padding: "4px", lineHeight: 1,
  },
  error: {
    background: "#2A1010", border: "1px solid #5A2020",
    borderRadius: 8, padding: "10px 12px", color: "#FF7070", fontSize: 12,
  },
  btnPrimary: {
    width: "100%", padding: "13px",
    background: "linear-gradient(135deg, #7B68EE, #9B85FF)",
    border: "none", borderRadius: 10, color: "#fff",
    fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4,
  },
  separador: { display: "flex", alignItems: "center", gap: 10, margin: "4px 0" },
  linea: { flex: 1, height: 1, background: "#2A2A4A" },
  separadorTexto: { fontSize: 11, color: "#4040A0", whiteSpace: "nowrap" },
  btnGoogle: {
    width: "100%", padding: "12px", background: "#1E1E3A",
    border: "1px solid #3A3A6A", borderRadius: 10, color: "#E8E8F0",
    fontSize: 14, fontWeight: 600, cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
  },
};