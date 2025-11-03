import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import './EstadisticasPersonales.css';

const EstadisticasPersonales = () => {
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [graficoHoras, setGraficoHoras] = useState([]);
  const [vista, setVista] = useState("semanal"); // "semanal" o "mensual"

  // Traer datos del backend
  useEffect(() => {
    fetch('/api/juegos')
      .then(res => res.json())
      .then(data => setJuegos(data));

    fetch('/api/reseñas')
      .then(res => res.json())
      .then(data => setReseñas(data));
  }, []);

  // Cálculos principales
  const juegosCompletados = juegos.filter(j => j.completado).length;
  const juegosPorCompletar = juegos.length - juegosCompletados;
  const porcentajeCompletados = juegos.length ? (juegosCompletados / juegos.length) * 100 : 0;

  const totalHoras = reseñas.reduce((acc, r) => acc + r.horasJugadas, 0);
  const promedioHoras = reseñas.length ? totalHoras / reseñas.length : 0;

  const dificultadCounts = reseñas.reduce((acc, r) => {
    acc[r.dificultad] = (acc[r.dificultad] || 0) + 1;
    return acc;
  }, {});

  // Función para calcular gráfico de horas
  useEffect(() => {
    const hoy = new Date();
    let data = [];

    if (vista === "semanal") {
      // Últimos 7 días
      for (let i = 6; i >= 0; i--) {
        const fecha = new Date();
        fecha.setDate(hoy.getDate() - i);
        const horasDia = reseñas
          .filter(r => new Date(r.fechaCreacion).toDateString() === fecha.toDateString())
          .reduce((acc, r) => acc + r.horasJugadas, 0);
        const fechaStr = fecha.toLocaleDateString();
        data.push({ fecha: fechaStr, horas: horasDia });
      }
    } else if (vista === "mensual") {
      // Últimos 30 días, agrupando por semana
      for (let i = 4; i >= 0; i--) {
        const semanaInicio = new Date();
        semanaInicio.setDate(hoy.getDate() - i * 7);
        const semanaFin = new Date();
        semanaFin.setDate(semanaInicio.getDate() + 6);
        const horasSemana = reseñas
          .filter(r => {
            const fechaR = new Date(r.fechaCreacion);
            return fechaR >= semanaInicio && fechaR <= semanaFin;
          })
          .reduce((acc, r) => acc + r.horasJugadas, 0);
        const label = `Semana ${4 - i + 1}`;
        data.push({ fecha: label, horas: horasSemana });
      }
    }

    setGraficoHoras(data);
  }, [reseñas, vista]);

  return (
    <div className="estadisticas-container">
      <h2>Estadísticas Personales</h2>

      <div className="estadisticas-principales">
        <p>Juegos completados: {juegosCompletados} ({porcentajeCompletados.toFixed(1)}%)</p>
        <p>Juegos por completar: {juegosPorCompletar}</p>
        <p>Total de horas jugadas: {totalHoras}</p>
        <p>Promedio de horas por juego: {promedioHoras.toFixed(1)}</p>
      </div>

      <div className="estadisticas-dificultad">
        <h3>Dificultad de los juegos:</h3>
        <ul>
          <li>Fácil: {dificultadCounts['Fácil'] || 0}</li>
          <li>Normal: {dificultadCounts['Normal'] || 0}</li>
          <li>Difícil: {dificultadCounts['Difícil'] || 0}</li>
        </ul>
      </div>

      <div className="grafico-horas">
        <h3>Horas jugadas ({vista})</h3>
        <div className="vista-botones">
          <button onClick={() => setVista("semanal")} className={vista === "semanal" ? "activo" : ""}>Semanal</button>
          <button onClick={() => setVista("mensual")} className={vista === "mensual" ? "activo" : ""}>Mensual</button>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={graficoHoras}>
            <XAxis dataKey="fecha" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="horas" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EstadisticasPersonales;
