import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link, useParams } from "react-router-dom";

const estilo = {
  cajaGral: {
    backgroundColor: "#000000",
    minHeight: "100vh",
  },
  h2: {
    margin: 0,
    fontFamily: "Red Hat Display",
  },
  icono: {
    marginTop: 10,
    paddingLeft: 40,
  },
  boton: {
    margin: "20px 0 30px 50px",
  },
  link: {
    fontSize: "25px",
    marginLeft: "80vh",
  },
};
export const RepositorioUnico = () => {
  const { user, repo } = useParams();

  const repositorios = async () => {
    const response = await axios.get(
      `https://api.github.com/repos/${user}/${repo}/contents`
    );
    return response;
  };
  const { data } = useQuery(["repoData"], repositorios, {
    refetchOnWindowFocus: "true",
    refetchOnMount: "true",
  });

  return (
    <div style={estilo.cajaGral} className=" row ">
      <h2 className="blue-text lighten-1  center" style={estilo.h2}>
        Repositorio: {repo}{" "}
      </h2>
      {data &&
        data.data.map((item, index) => (
          <div className=" row " key={index}>
            <i
              className=" indigo-text darken-3 Medium material-icons col s0.8"
              style={estilo.icono}
            >
              folder
            </i>
            <h4 className=" indigo-text darken-3 ">{item.name}</h4>
          </div>
        ))}
      <Link
        to="/:true"
        className="btn waves-effect red accent-4 white-text"
        style={estilo.boton}
      >
        Volver
      </Link>
      <a
        style={estilo.link}
        className="deep-purple-text lighten-2"
        href={`https://github.com/${user}/${repo}`}
      >
        Continuar explorando en GitHub
      </a>
    </div>
  );
};
