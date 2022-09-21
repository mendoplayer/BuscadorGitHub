import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

const estiloRepo = {
  cajaGral: {
    backgroundColor: "#000000",
    height: "100%",
  },
  textoLinea: {
    borderBottom: "1px solid #ffffff",
    paddingBottom: 20,
  },
  imagen: {
    width: 150,
    height: 150,
    marginLeft: 40,
    borderRadius: 50,
  },
  titulo: {
    fontFamily: "Red Hat Display",
    marginLeft: 20,
  },
  nombre: {
    fontSize: 16,
    marginLeft: 20,
  },
};
export const Repositorios = ({ repositorio, img }) => {
  const repositorios = async () => {
    const response = await axios.get(repositorio);
    return response;
  };
  const { data } = useQuery(["repoData"], repositorios, {
    refetchInterval: 2000,
  });

  return (
    <div style={estiloRepo.cajaGral}>
      <h2 className="blue-text lighten-1  lighten-2" style={estiloRepo.titulo}>
        REPOSITORIOS DE : {img.login}
      </h2>
      <img style={estiloRepo.imagen} src={img?.avatar_url} alt="avatar" />
      {data &&
        data?.data?.map((item, index) => (
          <div key={index} style={estiloRepo.textoLinea}>
            <h6 className="red-text accent-2" style={estiloRepo.nombre}>
              Nombre:{" "}
            </h6>
            <Link
              style={estiloRepo.nombre}
              to={`/repositorioUnico/${item?.owner?.login}/${item.name}`}
              className="white-text"
            >
              {item.name}
            </Link>
          </div>
        ))}
    </div>
  );
};
