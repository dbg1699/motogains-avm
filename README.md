# 🏍️ MotoGains — Control de Gastos y Ganancias

App para controlar los ingresos y gastos de trabajo en moto (DiDi Food e InDrive).

---

## 📁 Estructura del proyecto

```
motogains/
├── public/
│   └── index.html
├── src/
│   ├── constants/
│   │   └── categories.js        ← Categorías (DiDi, InDrive, Gasolina...)
│   ├── hooks/
│   │   └── useRegistros.js      ← Lógica de estado (agregar, editar, borrar)
│   ├── styles/
│   │   └── styles.js            ← Todos los estilos en un solo lugar
│   ├── components/
│   │   ├── Header.jsx            ← Cabecera + selector de período
│   │   ├── StatsCards.jsx        ← Tarjetas de Ganancias / Gastos / Balance
│   │   ├── MainTabs.jsx          ← Pestañas Resumen / Agregar / Historial
│   │   ├── SectionTitle.jsx      ← Título de sección reutilizable
│   │   ├── Toast.jsx             ← Notificación emergente
│   │   ├── ConfirmModal.jsx      ← Modal de confirmación al borrar
│   │   └── pages/
│   │       ├── Resumen.jsx       ← Vista de resumen y gráfica
│   │       ├── AgregarForm.jsx   ← Formulario para agregar/editar
│   │       └── Historial.jsx     ← Lista de registros
│   └── App.jsx                   ← Componente principal
├── package.json
└── README.md
```

---

## 🚀 Cómo instalar y correr

### 1. Tener Node.js instalado
Descárgalo desde https://nodejs.org (versión LTS recomendada)

### 2. Crear el proyecto con Vite (recomendado)
```bash
npm create vite@latest motogains -- --template react
cd motogains
npm install
```

### 3. Reemplazar los archivos
Copia los archivos de esta carpeta `src/` dentro del `src/` de tu proyecto Vite.

### 4. Correr la app
```bash
npm run dev
```

Abre http://localhost:5173 en el navegador.

---

## ✏️ Cómo personalizar

- **Agregar categorías**: edita `src/constants/categories.js`
- **Cambiar colores**: edita `src/styles/styles.js`
- **Guardar datos permanentemente**: en `src/hooks/useRegistros.js` puedes cambiar `useState` por `localStorage`
- **Añadir más vistas/páginas**: crea un nuevo archivo en `src/components/pages/`
