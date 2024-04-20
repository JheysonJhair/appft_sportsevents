import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useEffect } from "react";
function AppLayout() {
  useEffect(() => {
    const scriptPaths = [
      "../assets/js/jquery.min.js",
      "../assets/plugins/simplebar/js/simplebar.min.js",
      "../assets/plugins/datatable/js/jquery.dataTables.min.js",
      "../assets/plugins/metismenu/js/metisMenu.min.js",
      "../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js",
      "../assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js",
      "../assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js",
      "../assets/plugins/chartjs/js/chart.js",
      "../assets/js/index.js",
      "../assets/js/app.js",
    ];

    const loadScript = (path: any) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = path;
        script.async = true;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      for (const scriptPath of scriptPaths) {
        try {
          await loadScript(scriptPath);
          console.log(`Script loaded: ${scriptPath}`);
        } catch (error) {
          console.error(`Failed to load script: ${scriptPath}`, error);
        }
      }
      console.log("All scripts loaded successfully.");
    };

    loadScripts();
  }, []);

  const { user } = useAuth();
  return (
    <>
      <div className="wrapper">
        <div className="sidebar-wrapper" data-simplebar="true">
          <div className="sidebar-header">
            <div>
              <img
                src="../../assets/images/logo_small.png"
                className="logo-icon"
                alt="logo icon"
              />
            </div>
            <div>
              <h4 className="logo-text red-text">DEPORTE</h4>
            </div>
            <div className="toggle-icon ms-auto">
              <i className="bx bx-arrow-back red-text" />
            </div>
          </div>
          <ul className="metismenu" id="menu">
            <li className="">
              <NavLink to="/">
                <div className="parent-icon">
                  <i className="bx bx-home-alt" />
                </div>
                <div className="menu-title">PANEL PRINCIPAL</div>
              </NavLink>
            </li>

            <li className="menu-label">USUARIOS</li>
            <li>
              <NavLink to="/operaciones/membresiaspagos/">
                <div className="parent-icon">
                  <i className="bx bx-credit-card" />
                </div>
                <div className="menu-title">Horarios</div>
              </NavLink>
            </li>
            <li>
              <a className="has-arrow" href="#">
                <div className="parent-icon">
                  <i className="bx bx-basket" />
                </div>
                <div className="menu-title">Trabajadores</div>
              </a>

              <ul>
                <li>
                  <NavLink to="/area/productos/">
                    <i className="bx bx-radio-circle" />
                    Areas
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/area/detailproducto/">
                    <i className="bx bx-radio-circle" />
                    Detalle de producto
                  </NavLink>
                </li>
              </ul>
            </li>
            <li>
              <NavLink to="/operaciones/membresiaspagos/">
                <div className="parent-icon">
                  <i className="bx bx-credit-card" />
                </div>
                <div className="menu-title">Área de juego</div>
              </NavLink>
            </li>
            {user?.RoleId === 1 && (
              <>
                <li className="menu-label">Configuración</li>
                <li>
                  <a className="has-arrow" href="#">
                    <div className="parent-icon">
                      <i className="bx bx-user" />
                    </div>
                    <div className="menu-title">Usuarios</div>
                  </a>

                  <ul>
                    <li>
                      <NavLink to="/area/usuarios/">
                        <i className="bx bx-radio-circle" />
                        Todos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/area/newusuario/">
                        <i className="bx bx-radio-circle" />
                        Nuevo usuario
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}
            <li>
              <a href="https://themeforest.net/user/codervent" target="_blank">
                <div className="parent-icon">
                  <i className="bx bx-support" />
                </div>
                <div className="menu-title">Ayuda</div>
              </a>
            </li>
          </ul>
        </div>
        <header>
          <div className="topbar d-flex align-items-center">
            <nav className="navbar navbar-expand gap-3">
              <div className="mobile-toggle-menu">
                <i className="bx bx-menu" />
              </div>
              <h5>09 de abril de 2024</h5>
              <div className="top-menu ms-auto">
                <ul className="navbar-nav align-items-center gap-1">
                  <i
                    className="bx bxs-sun"
                    style={{ fontSize: "29px", marginLeft: "20px" }}
                  ></i>
                  <div
                    className="col text-center"
                    style={{ marginRight: "50px" }}
                  >
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      Mañana
                    </h6>
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      78ºF/75ºF
                    </h6>
                  </div>
                  <i className="bx bxs-moon" style={{ fontSize: "24px" }}></i>
                  <div
                    className="col text-center"
                    style={{ marginRight: "20px" }}
                  >
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      Mañana
                    </h6>
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      78ºF/75ºF
                    </h6>
                  </div>
                </ul>
              </div>
              <div className="user-box dropdown px-3">
                <a
                  className="d-flex align-items-center nav-link dropdown-toggle gap-3 dropdown-toggle-nocaret"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="../../assets/images/avatars/avatar-11.png"
                    className="user-img"
                    alt="user avatar"
                  />
                  <div className="user-info">
                    <p className="user-name mb-0">{user?.Username}</p>
                    <p className="designattion mb-0">
                      {user?.RoleId === 1 ? "Usuario supremo" : "Usuario"}
                    </p>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="bx bx-user fs-5" />
                      <span>Perfil</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="bx bx-cog fs-5" />
                      <span>Configuracion</span>
                    </a>
                  </li>

                  <li>
                    <div className="dropdown-divider mb-0" />
                  </li>
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="#"
                    >
                      <i className="bx bx-log-out-circle" />
                      <span>Cerrar sesión</span>
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </header>
        <Outlet />
        <div className="overlay toggle-icon" />
        <a href="#" className="back-to-top">
          <i className="bx bxs-up-arrow-alt" />
        </a>
        <footer className="page-footer">
          <p className="mb-0">
            Copyright © DRAGON'S GYM 2024. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default AppLayout;
