import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { validateRequiredField } from "../../utils/validations";
import { Management } from "../../types/Management";
import { Area } from "../../types/Area";
import { fetchGerencias } from "../../services/Gerencia";
import { crearGerencia } from "../../services/Gerencia";
import { crearArea } from "../../services/Area";

export function NewManagementArea() {
  const navigate = useNavigate();
  const [nuevoArea, setNuevoArea] = useState<Partial<Area>>({
    IdManagement: 0,
  });

  const [nuevoGerencia, setNuevoGerencia] = useState<Partial<Management>>({});
  const [gerencias, setGerencias] = useState<Management[]>([]);
  const [errorMessages, setErrorMessages] = useState({
    IdManagement: "",
    NameArea: "",
    NameManagement: "",
  });

  //---------------------------------------------------------------- GET MANAGEMENT
  useEffect(() => {
    const getGerencias = async () => {
      try {
        const gerenciasData = await fetchGerencias();
        const filteredGerencias = gerenciasData.filter(
          (gerencia) => gerencia.NameManagement !== "SISTEMA"
        );
        setGerencias(filteredGerencias);
      } catch (error) {
        console.error(error);
      }
    };
    getGerencias();
  }, []);

  //---------------------------------------------------------------- INPUT CHANGE
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "NameManagement") {
      setNuevoGerencia({ NameManagement: value });
    } else if (name === "IdManagement") {
      setNuevoArea({
        ...nuevoArea,
        [name]: parseInt(value),
      });
    } else {
      setNuevoArea({
        ...nuevoArea,
        [name]: value,
      });
    }

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  //-------------------------------------- VALIDATION
  const validateField = (
    _: string,
    value: string | undefined
  ): string | null => {
    return validateRequiredField(value);
  };

  //---------------------------------------------------------------- POST MANAGEMENT
  const handleRegistrarGerencia = async () => {
    try {
      const { NameManagement } = nuevoGerencia;

      if (!NameManagement) {
        Swal.fire({
          title: "Error!",
          text: "Por favor complete el campo obligatorio de Nombre de Gerencia.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const response = await crearGerencia(NameManagement);

      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setNuevoGerencia({});
        navigate("/management-area/");
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg,
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salió mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al registrar la gerencia:", error);
    }
  };

  //---------------------------------------------------------------- POST AREA
  const handleRegistrarArea = async () => {
    try {
      const { NameArea, IdManagement } = nuevoArea;

      if (!NameArea || !IdManagement) {
        Swal.fire({
          title: "Error!",
          text: "Por favor complete los campos obligatorios de Nombre de Área y Gerencia.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      const response = await crearArea(NameArea, IdManagement);

      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: response.msg,
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setNuevoArea({});
        navigate("/management-area/");
      } else {
        Swal.fire({
          title: "Error",
          text: response.msg,
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salió mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al registrar el área:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Gerencia y área</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Crear gerencia y área
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="row">
            <div className="col-12 col-lg-4 ">
              <div className="card p-4">
                <div className="col-sm-12">
                  <label htmlFor="input01" className="col-sm-12 col-form-label">
                    Nombre de Gerencia
                  </label>
                  <div className="col-sm-">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-briefcase" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.NameManagement && "is-invalid"
                        }`}
                        id="input01"
                        placeholder="Nombre"
                        name="NameManagement"
                        onChange={handleInputChange}
                      />
                      {errorMessages.NameManagement && (
                        <div className="invalid-feedback">
                          {errorMessages.NameManagement}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col"></div>
                    <div className=" ">
                      <button
                        className="btn btn-danger btn-block"
                        onClick={handleRegistrarGerencia}
                      >
                        <i className="bx bx-briefcase" /> Registrar Gerencia
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8 ">
              <div className="card p-4">
                <div className="row">
                  <div className="col-sm-6">
                    <label
                      htmlFor="input02"
                      className="col-sm-12 col-form-label"
                    >
                      Nombre de área
                    </label>
                    <div className="col-sm-11">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bx bx-layer" />
                        </span>
                        <input
                          type="text"
                          className={`form-control ${
                            errorMessages.NameArea && "is-invalid"
                          }`}
                          id="input02"
                          placeholder="Nombre"
                          name="NameArea"
                          onChange={handleInputChange}
                        />
                        {errorMessages.NameArea && (
                          <div className="invalid-feedback">
                            {errorMessages.NameArea}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <label
                      htmlFor="input03"
                      className="col-sm-12 col-form-label"
                    >
                      Gerencia
                    </label>
                    <div className="col-sm-12">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="bx bx-briefcase" />
                        </span>
                        <select
                          className={`form-select ${
                            errorMessages.IdManagement && "is-invalid"
                          }`}
                          id="input07"
                          name="IdManagement"
                          onChange={handleInputChange}
                        >
                          <option>Seleccionar Gerencia</option>
                          {gerencias.map((gerencia) => (
                            <option
                              key={gerencia.IdManagement}
                              value={gerencia.IdManagement}
                            >
                              {gerencia.NameManagement}
                            </option>
                          ))}
                        </select>
                        {errorMessages.IdManagement && (
                          <div className="invalid-feedback">
                            {errorMessages.IdManagement}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="row mt-4">
                      <div className="col"></div>
                      <div className="col-auto ml-auto">
                        <button
                          className="btn btn-danger btn-block"
                          onClick={handleRegistrarArea}
                        >
                          <i className="bx bx-layer" /> Registrar Área
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
