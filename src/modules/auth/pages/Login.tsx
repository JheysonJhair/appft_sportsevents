import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAuth } from "../../../hooks/AuthContext";
import { login } from "../../../services/Login";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  //---------------------------------------------------------------- POST LOGIN
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login({
        UserRequest: username,
        Password: password,
      });
      if (!response.success) {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        if (response.data.Rol == 1 || response.data.Rol == 2) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Bienvenido ${response.data.FirstName}`,
            showConfirmButton: false,
            timer: 1500,
          });

          setUser(response.data);
          navigate("/");
        }
        if (response.data.Rol == 3) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Cancha a cargo de ${response.data.FirstName}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(response.data);
          navigate("/administrator-field");
        }
        if (response.data.Rol == 4) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Administrador ${response.data.FirstName}`,
            showConfirmButton: false,
            timer: 1500,
          });
          setUser(response.data);
          navigate("/administrator");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Oppss, algo salio mal!",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div className="row g-0">
      <div className="col-12 col-xl-7 col-xxl-8 auth-cover-left align-items-center justify-content-center d-none d-xl-flex">
        <div className="card bg-transparent shadow-none rounded-0 mb-0">
          <div className="card-body">
            <img
              src="assets/images/login-images/login-cover.svg"
              className="img-fluid auth-img-cover-login"
              width={650}
            />
          </div>
        </div>
      </div>
      <div className="col-12 col-xl-5 col-xxl-4 auth-cover-right align-items-center justify-content-center">
        <div className="card rounded-0 m-3 shadow-none bg-transparent mb-0 ">
          <div
            className="card-body p-sm-5  m-2 "
            style={{
              borderRadius: "20px",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div>
              <div className="mb-3 text-center">
                <img
                  className="mx-3"
                  src="assets/images/logo_tesel.jpeg"
                  width={200}
                />
                <img src="assets/images/logo-icon.png" width={100} />
              </div>
              <div className="text-center mb-4">
                <h5 className="mb-3 fs-4" style={{ fontWeight: "bold" }}>
                  Bienvenido
                </h5>
                <p className="mb-0 fs-6">
                  Continua iniciando sesión de manera rápida y sencilla!
                </p>
              </div>

              <div className="col-12 mb-4">
                <p
                  style={{ backgroundColor: "#eff0f4", textAlign: "center" }}
                  className=" w-100 p-3"
                >
                  INICIAR SESIÓN
                </p>
              </div>

              <div className="form-body">
                <form className="row g-3" onSubmit={handleSubmit}>
                  <div className="col-12">
                    <label htmlFor="inputEmailAddress" className="form-label">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      style={{ padding: "9px" }}
                      id="inputEmailAddress"
                      placeholder="Usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoComplete="username"
                    />
                  </div>
                  <div className="col-12">
                    <label htmlFor="inputChoosePassword" className="form-label">
                      Contraseña
                    </label>
                    <div className="input-group" id="show_hide_password">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-end-0"
                        style={{ padding: "9px" }}
                        id="inputChoosePassword"
                        placeholder="Tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                      />
                      <button
                        className="input-group-text bg-transparent border-start-0"
                        onClick={() => setShowPassword(!showPassword)}
                        type="button"
                      >
                        {showPassword ? (
                          <i className="bx bx-show" />
                        ) : (
                          <i className="bx bx-hide" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-danger "
                        style={{ padding: "9px" }}
                      >
                        Ingresar
                      </button>
                    </div>
                  </div>
                  <div className="text-center ">
                    <p className="mb-0">
                      ¿Aún no tienes una cuenta?{" "}
                      <NavLink to="/register" className="text-danger">
                        Regístrate aquí{" "}
                      </NavLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
