import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { verificarCodigo } from "../../../services/Usuario";
import { crearUsuario } from "../../../services/Usuario";

export default function VerificationCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, formData } = location.state as {
    email: string;
    formData: any;
  };

  const [code, setCode] = useState("");

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value);
  };

  const handleVerify = async () => {
    try {
      const response = await verificarCodigo(email, code);
      if (response.value) {
        const userResponse = await crearUsuario(formData);
        if (userResponse.success) {
          Swal.fire({
            title: "<strong>Información de inicio de sesión</strong>",
            icon: "info",
            html: `
              Al ingresar al sistema, tu <b>usuario</b> será tu <b>DNI</b>.<br>
              La <b>contraseña</b> será las iniciales de tu primer nombre y primer apellido seguidas de tu <b>DNI</b>.<br><br>
              
              <b>Te estaremos enviando a tu gmail personal el usuario y contraseña en caso lo olvides.</b> 
            `,
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: `
              <i class="fa fa-thumbs-up"></i> ¡Entendido!
            `,
            confirmButtonAriaLabel: "Thumbs up, great!"
          });

          navigate("/login");
        } else {
          Swal.fire({
            title: "Error!",
            text: userResponse.msg,
            icon: "error",
            confirmButtonText: "Aceptar",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Código de verificación incorrecto.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="row g-0">
      <div className="section-authentication-signin d-flex align-items-center justify-content-center my-5 my-lg-4">
        <div className="container">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div className="col mx-auto">
              <div className="card my-5 my-lg-0 shadow-none border">
                <div className="card-body">
                  <div className="p-4">
                    <div className="text-center">
                      <img src="assets/images/logo-icon.png" width={130} />
                    </div>
                    <h4 className="mt-3 font-weight-bold text-center">
                      Código de verificación
                    </h4>
                    <p className="text-muted">
                      Te hémos enviado un código de verificación a tu correo:{" "}
                      <span className="text-danger">{email}</span>
                    </p>
                    <div className="my-4">
                      <label className="form-label">Código</label>
                      <input
                        type="number"
                        className="form-control"
                        placeholder="XXXXXX"
                        value={code}
                        onChange={handleCodeChange}
                      />
                    </div>
                    <div className="d-grid gap-2">
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleVerify}
                      >
                        Verificar
                      </button>
                      <a
                        href="authentication-signin.html"
                        className="btn btn-light"
                      >
                        <i className="bx bx-arrow-back me-1" />
                        Volver atrás
                      </a>
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
