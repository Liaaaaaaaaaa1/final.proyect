// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />           {/* Página principal = Login */}
        <Route path="/login" element={<Login />} />     {/* Otra ruta a Login */}
        <Route path="/register" element={<Register />} /> {/* Registro */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Olvidaste contraseña */}
      </Routes>
    </Router>
  );
}

export default App;
