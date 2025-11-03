import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  // Recuperar usuario guardado si existe
  useEffect(() => {
    const savedUser = localStorage.getItem("savedUsername");
    if (savedUser) {
      setUsername(savedUser);
      setRemember(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Simulación de login temporal
    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));
    if (savedUser && username === savedUser.username && password === savedUser.password) {
      alert(`✅ Bienvenido, ${username}!`);
      if (remember) localStorage.setItem("savedUsername", username);
      else localStorage.removeItem("savedUsername");

      // Aquí se conectaría al backend con fetch/axios
      // fetch("/api/login", { method: "POST", body: JSON.stringify({ username, password }) })

      window.location.href = "/home"; // Redirige a página home
    } else {
      alert("❌ Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Ingreso</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Recuérdame
          </label>
          <Link to="/forgot-password" className="forgot-btn">
            ¿Olvidaste la contraseña?
          </Link>
        </div>

        <button type="submit" className="btn">Ingresar</button>

        <div className="register-link">
          <p>
            ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
