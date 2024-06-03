import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { User, ErrorMessages } from "../../../types/User";
import { crearUsuario } from "../../../services/Usuario";
import { fetchGerencias } from "../../../services/Gerencia";
import { fetchAreasByManagementId } from "../../../services/Area";
import { Management } from "../../../types/Management";
import {
  validateRequiredField,
  validateDNI,
  validateEmail,
  validatePhoneNumber,
} from "../../../utils/validations";

export function Register(): JSX.Element {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<User>({
    FirstName: "",
    LastName: "",
    Dni: "",
    IdArea: "",
    Shift: "",
    PhoneNumber: "",
    Mail: "",
    Rol: 0,
  });

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
  const [gerencias, setGerencias] = useState<Management[]>([]);
  const [areas, setAreas] = useState<any[]>([]);

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

  const handleInputChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "Rol" ? Number(value) : value,
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

  const validateField = (name: string, value: string): string | null => {
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
        return validateRequiredField(value) || null;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields: Array<keyof User> = [
      "FirstName",
      "LastName",
      "Dni",
      "IdArea",
      "Shift",
      "PhoneNumber",
      "Mail",
      "Rol",
    ];
    const newErrorMessages: ErrorMessages = {};

    let hasError = false;

    requiredFields.forEach((field) => {
      const error = validateField(field, formData[field] as string);
      if (error) {
        newErrorMessages[field] = error;
        hasError = true;
      }
    });

    setErrorMessages(newErrorMessages);

    if (hasError) {
      Swal.fire({
        title: "Error!",
        text: "Por favor complete los campos correctamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      try {
        const response = await crearUsuario(formData);
        if (response.success) {
          Swal.fire({
            title: "Correcto!",
            text: response.msg,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
          navigate("/login");
        } else {
          Swal.fire({
            title: "Error!",
            text: response.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } catch (error) {
        console.error(error)
      }
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center my-4">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card mb-0">
              <div className="card-body">
                <div className="py-3 px-4">
                  <div className="mb-1 text-center">
                    <img
                      src="assets/images/logo-icon.png"
                      width={120}
                      alt="Logo"
                    />
                  </div>
                  <div className="text-center mb-4">
                    <p className="mb-0">
                      Por favor complete los detalles a continuación para crear
                      su cuenta
                    </p>
                  </div>
                  <div className="form-body">
                    <form className="row g-3" onSubmit={handleSubmit}>
                      <div className="col-md-3">
                        <label htmlFor="inputDni" className="form-label">
                          Dni
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errorMessages.Dni && "is-invalid"
                          }`}
                          id="inputDni"
                          name="Dni"
                          placeholder="0000000"
                          maxLength={8}
                          pattern="\d{8}"
                          title="Ingrese 8 dígitos"
                          onChange={handleInputChange}
                        />
                        {errorMessages.Dni && (
                          <div className="invalid-feedback">
                            {errorMessages.Dni}
                          </div>
                        )}
                      </div>
                      <div className="col-md-4  ">
                        <label htmlFor="inputTurno" className="form-label">
                          Turno
                        </label>
                        <select
                          className={`form-select ${
                            errorMessages.Shift && "is-invalid"
                          }`}
                          id="inputTurno"
                          name="Shift"
                          aria-label="Default select example"
                          onChange={handleInputChange}
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
                      <div className="col-md-5">
                        <label htmlFor="inputRol" className="form-label">
                          Rol
                        </label>
                        <select
                          className={`form-select ${
                            errorMessages.Rol && "is-invalid"
                          }`}
                          id="inputRol"
                          name="Rol"
                          aria-label="Default select example"
                          onChange={handleInputChange}
                        >
                          <option>Seleccionar rol</option>
                          <option value="1">Operaciones Mina</option>
                          <option value="2">Trabajador</option>
                        </select>
                        {errorMessages.Rol && (
                          <div className="invalid-feedback">
                            {errorMessages.Rol}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputNombres" className="form-label">
                          Nombres
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errorMessages.FirstName && "is-invalid"
                          }`}
                          id="inputNombres"
                          name="FirstName"
                          placeholder="Ingrese su nombre"
                          onChange={handleInputChange}
                        />
                        {errorMessages.FirstName && (
                          <div className="invalid-feedback">
                            {errorMessages.FirstName}
                          </div>
                        )}
                      </div>
                      <div className="col-12">
                        <label htmlFor="inputApellidos" className="form-label">
                          Apellidos
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errorMessages.LastName && "is-invalid"
                          }`}
                          id="inputApellidos"
                          name="LastName"
                          placeholder="Ingrese sus apellidos"
                          onChange={handleInputChange}
                        />
                        {errorMessages.LastName && (
                          <div className="invalid-feedback">
                            {errorMessages.LastName}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputEmail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control ${
                            errorMessages.Mail && "is-invalid"
                          }`}
                          id="inputEmail"
                          name="Mail"
                          placeholder="example@user.com"
                          onChange={handleInputChange}
                        />
                        {errorMessages.Mail && (
                          <div className="invalid-feedback">
                            {errorMessages.Mail}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputTelefono" className="form-label">
                          Teléfono
                        </label>
                        <input
                          type="text"
                          className={`form-control ${
                            errorMessages.PhoneNumber && "is-invalid"
                          }`}
                          id="inputTelefono"
                          name="PhoneNumber"
                          placeholder="000000000"
                          maxLength={9}
                          pattern="\d{9}"
                          title="Ingrese 9 dígitos"
                          onChange={handleInputChange}
                        />
                        {errorMessages.PhoneNumber && (
                          <div className="invalid-feedback">
                            {errorMessages.PhoneNumber}
                          </div>
                        )}
                      </div>
                      <div className="col-md-6">
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
                      <div className="col-md-6">
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

                      <div className="col-12">
                        <div className="d-grid">
                          <button type="submit" className="btn btn-danger">
                            Registrarse
                          </button>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="text-center ">
                          <p className="mb-0">
                            ¿Ya tienes una cuenta?{" "}
                            <NavLink to="/login" className="text-danger">
                              Iniciar sesión
                            </NavLink>
                          </p>
                        </div>
                      </div>
                    </form>
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
