// src/hooks/useAuth.js
// ─────────────────────────────────────────────────────────────
// Hook para manejar autenticación con Firebase Auth.
// ─────────────────────────────────────────────────────────────

import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase";

export function useAuth() {
  const [usuario,  setUsuario]  = useState(null);
  const [cargando, setCargando] = useState(true);

  // Escucha cambios en sesión
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  // Login con email y contraseña
  const iniciarSesion = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  // Registro con email y contraseña
  const registrarse = async (email, password, nombre) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName: nombre });
    return cred.user;
  };

  // Login con Google
  const iniciarSesionGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    return cred.user;
  };

  // Cerrar sesión
  const cerrarSesion = () => signOut(auth);

  return {
    usuario,
    cargando,
    iniciarSesion,
    registrarse,
    iniciarSesionGoogle,
    cerrarSesion,
  };
}