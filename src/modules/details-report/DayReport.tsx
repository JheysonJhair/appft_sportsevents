import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { Management } from "../../types/Management";
import { ReportDay } from "../../types/DayReport";
import { fetchUserDataByDNI } from "../../services/Login";
import { crearReporte } from "../../services/Reportes";
import { fetchGerencias } from "../../services/Gerencia";
import { fetchAreasByManagementId } from "../../services/Area";

export function DayReport() {
  const navigate = useNavigate();
  const [reporte, setReporte] = useState<Partial<ReportDay>>({
    IdArea: 0,
    NamePlayer: "",
    Description: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    NamePlayer: "",
    Description: "",
    IdArea: "",
  });

  const [gerencias, setGerencias] = useState<Management[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

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
  const handleInputChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setReporte((prevReporte) => ({
      ...prevReporte,
      [name]: name === "IdArea" ? Number(value) : value,
    }));

    setErrorMessages((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
    if (name === "Gerencia") {
      try {
        const areasData = await fetchAreasByManagementId(value);
        setAreas(areasData.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  //------------------------------- RENIEC
  const handleBuscarJugador = async () => {
    const dni = reporte.Dni;
    if (!dni) {
      Swal.fire({
        title: "Error",
        text: "Por favor ingrese un DNI válido.",
        icon: "warning",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const response = await fetchUserDataByDNI(dni);
      if (response) {
        setReporte((prevReporte) => ({
          ...prevReporte,
          NamePlayer:
            response.nombres +
            response.apellidoPaterno +
            " " +
            response.apellidoMaterno,
        }));
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
        text: "Opps, algo salió mal al buscar el jugador!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al buscar el jugador:", error);
    }
  };

  //------------------------------- VALIDATION
  const validateField = (name: string, value: string): string => {
    if (
      !value &&
      (name === "NamePlayer" || name === "Description" || name === "IdArea")
    ) {
      return "Este campo es obligatorio";
    }
    return "";
  };

  //---------------------------------------------------------------- POST REPORT
  const handleRegistrarReporte = async () => {
    const requiredFields = ["IdArea", "NamePlayer", "Description"];
    const missingFields = requiredFields.filter(
      (field) => !reporte[field as keyof ReportDay]
    );

    if (missingFields.length > 0) {
      Swal.fire({
        title: "Error!",
        text: "Por favor complete todos los campos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const reporteParaEnviar: Partial<ReportDay> = {
        ...reporte,
      };

      delete reporteParaEnviar.Gerencia;
      const response = await crearReporte(reporteParaEnviar as ReportDay);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: "El reporte se registró correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/administrator-field/");
      } else {
        Swal.fire({
          title: "Alerta",
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
      console.error("Error al registrar el reporte:", error);
    }
  };

  return (
    <div className="page-wrapper ">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center ">
          <div className="breadcrumb-title pe-3">Reporte</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Reportar suceso
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row px-5 py-2 justify-content-center">
          <div className="col-lg-7 mb-3">
            <img
              src="assets/images/report.svg"
              className="img-fluid auth-img-cover-login"
              width={490}
              alt="Report Illustration"
            />
          </div>
          <div className="card col-lg-5">
            <div className="px-3 py-4 rounded">
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="inputGerencia" className="form-label">
                    Gerencia
                  </label>
                  <select
                    className={`form-select ${
                      errorMessages.IdArea && "is-invalid"
                    }`}
                    id="inputGerencia"
                    name="Gerencia"
                    aria-label="Default select example"
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
                  {errorMessages.IdArea && (
                    <div className="invalid-feedback">
                      {errorMessages.IdArea}
                    </div>
                  )}
                </div>
                <div className="col-md-12">
                  <label htmlFor="inputArea" className="form-label">
                    Área
                  </label>
                  <select
                    className={`form-select ${
                      errorMessages.IdArea && "is-invalid"
                    }`}
                    id="inputArea"
                    name="IdArea"
                    aria-label="Default select example"
                    onChange={handleInputChange}
                  >
                    <option>Seleccionar área</option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.IdArea}>
                        {area.NameArea}
                      </option>
                    ))}
                  </select>
                  {errorMessages.IdArea && (
                    <div className="invalid-feedback">
                      {errorMessages.IdArea}
                    </div>
                  )}
                </div>
                <div className="col-md-6">
                  <label htmlFor="inputDni" className="form-label">
                    Dni
                  </label>
                  <div className="input-group">
                    <input
                      type="number"
                      className="form-control"
                      id="inputDni"
                      name="Dni"
                      placeholder="Tu dni"
                      maxLength={8}
                      pattern="\d{8}"
                      title="Ingrese 8 dígitos"
                      onChange={handleInputChange}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={handleBuscarJugador}
                    >
                      <i className="bx bx-search"></i>
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="input01" className="form-label">
                    Jugador infractor
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errorMessages.NamePlayer && "is-invalid"
                    }`}
                    id="input01"
                    name="NamePlayer"
                    placeholder="Ingrese nombre del jugador"
                    onChange={handleInputChange}
                    value={reporte.NamePlayer}
                  />
                  {errorMessages.NamePlayer && (
                    <div className="invalid-feedback">
                      {errorMessages.NamePlayer}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <label htmlFor="input02" className="form-label">
                    Reporte de infracción
                  </label>
                  <textarea
                    className={`form-control ${
                      errorMessages.Description && "is-invalid"
                    }`}
                    id="input02"
                    name="Description"
                    placeholder="Que sucedio..."
                    style={{ height: "100px" }}
                    onChange={handleInputChange}
                  />
                  {errorMessages.Description && (
                    <div className="invalid-feedback">
                      {errorMessages.Description}
                    </div>
                  )}
                </div>
                <div className="col-12">
                  <div className="d-grid">
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={handleRegistrarReporte}
                    >
                      Reportar evento
                    </button>
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
