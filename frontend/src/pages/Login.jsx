import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormFooter from "../components/FormFooter";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");  // Usamos email en vez de username
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  // Recuperar email guardado si existe
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message || "Error en login"}`);
        return;
      }

      alert(`✅ Bienvenido, ${data.username}!`);

      // Guardar email si "Recuérdame" está activo
      if (remember) localStorage.setItem("savedEmail", email);
      else localStorage.removeItem("savedEmail");

      // Redirigir al home
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Ingreso</h1>

        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

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

        <Button type="submit" text="Ingresar" />

        <FormFooter
          text="¿No tienes una cuenta?"
          linkText="Regístrate"
          linkTo="/register"
        />
      </form>
    </div>
  );
}

export default Login;
