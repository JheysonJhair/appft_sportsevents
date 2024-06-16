import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validations";
import { Management } from "../../../types/Management";
import { User } from "../../../types/User";
import { crearUsuario } from "../../../services/Usuario";
import { fetchGerencias } from "../../../services/Gerencia";
import { fetchAreasByManagementId } from "../../../services/Area";

export function NewUser() {
  const navigate = useNavigate();
  const [nuevoUsuario, setNuevoUsuario] = useState<Partial<User>>({});
  const [gerencias, setGerencias] = useState<Management[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

  const [errorMessages, setErrorMessages] = useState({
    FirstName: "",
    LastName: "",
    Dni: "",
    PhoneNumber: "",
    IdArea: "",
    Mail: "",
    Shift: "",
    Rol: "",
  });
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  //---------------------------------------------------------------- GET MANAGEMENTS
  useEffect(() => {
    const getGerencias = async () => {
      try {
        const gerenciasData = await fetchGerencias();
        setGerencias(gerenciasData);
      } catch (error) {
        console.error(error);
      }
    };
    getGerencias();
  }, []);

  //---------------------------------------------------------------- INPUT CHANGE
  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "Rol") {
      setShowAdditionalFields(value === "1" || value === "2");
      let updatedUsuario = { ...nuevoUsuario };
      if (value === "1") {
        const operacionMinaId =
          gerencias.find((g) => g.NameManagement === "OPERACIONES MINA")
            ?.IdManagement || 1;

        updatedUsuario = {
          ...updatedUsuario,
          Gerencia: operacionMinaId,
          Shift: "SIN TURNO",
        };

        try {
          const areasData = await fetchAreasByManagementId(operacionMinaId);
          setAreas(areasData.data);
        } catch (error) {
          console.error(error);
        }
      } else if (value === "3") {
        updatedUsuario = {
          ...updatedUsuario,
          IdArea: 2,
          Shift: "SIN TURNO",
        };
      } else if (value === "4") {
        updatedUsuario = {
          ...updatedUsuario,
          IdArea: 1,
          Shift: "SIN TURNO",
        };
      } else {
        updatedUsuario = {
          ...updatedUsuario,
          Gerencia: undefined,
        };
      }
      setNuevoUsuario(updatedUsuario);
    }

    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]:
        name === "Rol"
          ? Number(value)
          : value && name === "IdArea"
          ? Number(value)
          : value,
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

  //---------------------------------------- VALIDATION
  const validateField = (
    name: string,
    value: string | undefined
  ): string | null => {
    switch (name) {
      case "Dni":
        return validateDNI(value) || validateRequiredField(value) || null;
      case "Mail":
        return validateEmail(value) || validateRequiredField(value) || null;
      case "PhoneNumber":
        return (
          validatePhoneNumber(value) || validateRequiredField(value) || null
        );
      default:
        return validateRequiredField(value);
    }
  };

  //---------------------------------------------------------------- POST USER
  type UsuarioKey = keyof Partial<User>;
  const handleRegistrarUsuario = async () => {
    try {
      const requiredFields: UsuarioKey[] = [
        "FirstName",
        "LastName",
        "Dni",
        "PhoneNumber",
        "Mail",
        "Rol",
      ];

      if (showAdditionalFields) {
        requiredFields.push("IdArea", "Shift");
      }

      const missingFields = requiredFields.filter(
        (field) => !nuevoUsuario[field]
      );
      if (missingFields.length > 0) {
        Swal.fire({
          title: "Error!",
          text: "Por favor complete los siguientes campos obligatorios:",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }

      const usuarioParaEnviar: Partial<User> = {
        ...nuevoUsuario,
        Shift: nuevoUsuario.Shift || "SIN TURNO",
      };
      delete usuarioParaEnviar.Gerencia;

      let response: { msg: string; success: boolean };
      response = await crearUsuario(usuarioParaEnviar);
      if (response.success) {
        Swal.fire({
          title: "Correcto!",
          text: "El usuario se registró correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        navigate("/users/");
      } else if (!response.success) {
        Swal.fire({
          title: "Error",
          text: response.msg + "",
          icon: "warning",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Opps, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      console.error("Error al registrar el nuevo usuario:", error);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Usuario</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Nuevo usuario
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-sm-10 card p-4">
            <div className="row">
              <div className="col-sm-6">
                <div className="row mb-3">
                  <label htmlFor="input01" className="col-sm-4 col-form-label">
                    Nombres
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-user" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.FirstName && "is-invalid"
                        }`}
                        id="input01"
                        placeholder="Nombre"
                        name="FirstName"
                        onChange={handleInputChange}
                      />
                      {errorMessages.FirstName && (
                        <div className="invalid-feedback">
                          {errorMessages.FirstName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input02" className="col-sm-4 col-form-label">
                    Apellidos
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-user" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.LastName && "is-invalid"
                        }`}
                        id="input02"
                        placeholder="Apellidos"
                        name="LastName"
                        onChange={handleInputChange}
                      />
                      {errorMessages.LastName && (
                        <div className="invalid-feedback">
                          {errorMessages.LastName}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input03" className="col-sm-4 col-form-label">
                    DNI
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-id-card" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.Dni && "is-invalid"
                        }`}
                        id="input03"
                        placeholder="Dni"
                        name="Dni"
                        onChange={handleInputChange}
                      />
                      {errorMessages.Dni && (
                        <div className="invalid-feedback">
                          {errorMessages.Dni}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input04" className="col-sm-4 col-form-label">
                    Telefono
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-phone" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.PhoneNumber && "is-invalid"
                        }`}
                        id="input04"
                        placeholder="Número de teléfono"
                        name="PhoneNumber"
                        onChange={handleInputChange}
                      />
                      {errorMessages.PhoneNumber && (
                        <div className="invalid-feedback">
                          {errorMessages.PhoneNumber}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="input05" className="col-sm-4 col-form-label">
                    Correo Electrónico
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-envelope" />
                      </span>
                      <input
                        type="text"
                        className={`form-control ${
                          errorMessages.Mail && "is-invalid"
                        }`}
                        id="input05"
                        placeholder="Email"
                        name="Mail"
                        onChange={handleInputChange}
                      />
                      {errorMessages.Mail && (
                        <div className="invalid-feedback">
                          {errorMessages.Mail}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="row mb-3">
                  <label htmlFor="input08" className="col-sm-4 col-form-label">
                    Rol
                  </label>
                  <div className="col-sm-8">
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bx bx-user-circle" />
                      </span>
                      <select
                        className={`form-select ${
                          errorMessages.Rol && "is-invalid"
                        }`}
                        name="Rol"
                        onChange={handleInputChange}
                        id="input08"
                      >
                        <option>Seleccionar rol</option>
                        <option value={1}>Operaciones Mina</option>
                        <option value={2}>Trabajador gerencias</option>
                        <option value={3}>Administrador de cancha</option>
                        <option value={4}>Administrador</option>
                      </select>
                      {errorMessages.Rol && (
                        <div className="invalid-feedback">
                          {errorMessages.Rol}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {showAdditionalFields && (
                  <>
                    <div className="row mb-3">
                      <label
                        htmlFor="input07"
                        className="col-sm-4 col-form-label"
                      >
                        Gerencia
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bx bx-building" />
                          </span>
                          <select
                            className={`form-select ${
                              errorMessages.Rol === "1" ? "is-invalid" : ""
                            }`}
                            id="input07"
                            name="Gerencia"
                            onChange={handleInputChange}
                            value={nuevoUsuario.Gerencia || ""}
                            disabled={nuevoUsuario.Rol === 1}
                          >
                            <option value="">Seleccionar gerencia</option>
                            {gerencias
                              .filter((gerencia) => {
                                if (nuevoUsuario.Rol === 2) {
                                  return (
                                    gerencia.NameManagement !==
                                      "OPERACIONES MINA" &&
                                    gerencia.NameManagement !== "SISTEMA"
                                  );
                                }
                                return true;
                              })
                              .map((gerencia) => (
                                <option
                                  key={gerencia.IdManagement}
                                  value={gerencia.IdManagement}
                                  disabled={
                                    nuevoUsuario.Rol !== 1 &&
                                    gerencia.NameManagement ===
                                      "OPERACIONES MINA"
                                  }
                                >
                                  {gerencia.NameManagement}
                                </option>
                              ))}
                          </select>
                          {errorMessages.Rol === "1" && (
                            <div className="invalid-feedback">
                              {errorMessages.Rol}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="input06"
                        className="col-sm-4 col-form-label"
                      >
                        Area
                      </label>
                      <div className="col-sm-8">
                        <div className="input-group">
                          <span className="input-group-text">
                            <i className="bx bx-user-circle" />
                          </span>
                          <select
                            className={`form-select ${
                              errorMessages.IdArea && "is-invalid"
                            }`}
                            id="input06"
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
                      </div>
                    </div>

                    {nuevoUsuario.Rol !== 1 && (
                      <div className="row mb-3">
                        <label
                          htmlFor="input09"
                          className="col-sm-4 col-form-label"
                        >
                          Turno
                        </label>
                        <div className="col-sm-8">
                          <div className="input-group">
                            <span className="input-group-text">
                              <i className="bx bx-log-in" />
                            </span>
                            <select
                              className={`form-select ${
                                errorMessages.Shift && "is-invalid"
                              }`}
                              name="Shift"
                              onChange={handleInputChange}
                              id="input09"
                            >
                              <option>Seleccionar turno</option>
                              <option value="Mañana">Mañana</option>
                              <option value="Noche">Noche</option>
                            </select>
                            {errorMessages.Shift && (
                              <div className="invalid-feedback">
                                {errorMessages.Shift}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}

                <div className="row mt-4">
                  <div className="col"></div>
                  <div className="col-auto ml-auto">
                    <button
                      className="btn btn-danger btn-block"
                      onClick={handleRegistrarUsuario}
                    >
                      <i className="bx bx-user-circle" /> Registrar Usuario
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
