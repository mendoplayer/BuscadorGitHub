import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import { Repositorios } from "../Components/Repositorios";
import { useParams } from "react-router-dom";

const estilo = {
  cajaGral: {
    backgroundColor: "#000000",
    height: "100vh",
  },
  header: {
    height: "70vh",
  },
  titulo: {
    padding: 20,
    fontFamily: "Bungee Spice",
    fontSize: "10vh",
  },
  input: {
    border: "1px solid",
    borderRadius: 10,
    padding: 5,
  },
  label: {
    paddingLeft: 10,
  },
  error: {
    color: "#ffffff",
    fontSize: "15px",
    marginLeft: "20%",
  },
};

function Home() {
  const [estado, setEstado] = useState(false);
  const [inputBuscar, setInputBuscar] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [datosQuery, setDatosQuery] = useState(
    window.localStorage.getItem("text")
  );
  const letrasAnimation = useAnimation();
  const { est } = useParams();
  const handleBuscar = async () => {
    await axios
      .get(`https://api.github.com/users/${datosQuery}`)
      .then(function (response) {
        setData(response.data);
        setError(null);
      })
      .catch(function (error) {
        setError(error);
      });
  };

  useEffect(() => {
    letrasAnimation.start({
      x: 50,
      transition: { duration: 4 },
    });
    setEstado(est);
  }, []);

  useEffect(() => {
    if (estado) {
      handleBuscar();
      console.log("buscando");
    }
  }, [estado]);

  const setLocalStorage = (value) => {
    try {
      setDatosQuery(value);
      setInputBuscar(value);
      window.localStorage.setItem("text", value);
    } catch (err) {
      console.log("ERROR", err);
    }
  };
  return (
    <div style={estilo.cajaGral}>
      <header className="center row" style={estilo.header}>
        <motion.h1
          className="white-text container "
          style={estilo.titulo}
          animate={letrasAnimation}
          initial={{ x: -1000 }}
        >
          ¡ Bienvenidos
        </motion.h1>
        <motion.h2
          className="white-text container"
          style={estilo.titulo}
          animate={letrasAnimation}
          initial={{ x: -2000 }}
        >
          al buscador de
        </motion.h2>
        <motion.h2
          className="white-text container"
          style={estilo.titulo}
          animate={letrasAnimation}
          initial={{ x: -3000 }}
        >
          GitHub !
        </motion.h2>
      </header>
      <div
        className="container row valign-wrapper"
        animate={letrasAnimation}
        initial={{ x: -4000 }}
      >
        <div className="input-field col s6 offset-s1">
          <input
            id="repositorio"
            type="text"
            className=" white-text"
            style={estilo.input}
            value={inputBuscar}
            onChange={(e) => setLocalStorage(e.target.value)}
          />
          <label htmlFor="repositorio " style={estilo.label}>
            Repositorio
          </label>
        </div>
        <button
          className="btn green darken-3  waves-effect  waves-light col s2 offset-s1"
          type="submit"
          name="action"
          onClick={handleBuscar}
        >
          Buscar
        </button>
      </div>
      <div>
        {error != null && (
          <h3 style={estilo.error}>
            No se encontro la busqueda, intente de nuevo
          </h3>
        )}
      </div>
      <div>
        {data && (
          <Repositorios
            repositorio={data.repos_url}
            img={data}
            setEstado={setEstado}
          />
        )}
      </div>
    </div>
  );
}

export default Home;
