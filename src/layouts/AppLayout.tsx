import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { useEffect, useState } from "react";
import { getWeather } from '../services/weather';

interface User {
  FirstName: string;
  Rol: number;
  Shift?: string;
  Area?: string;
}

interface Weather {
  temp: number;
}

function AppLayout() {
  const [currentDate, setCurrentDate] = useState<{
    small: string;
    large: string;
  }>({
    small: "",
    large: "",
  });

  const [weatherToday, setWeatherToday] = useState<Weather | null>(null);
  const [weatherTomorrow, setWeatherTomorrow] = useState<Weather | null>(null);

  useEffect(() => {
    const optionsSmall: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    };
    const optionsLarge: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDateSmall = new Date().toLocaleDateString("es-ES", optionsSmall);
    const formattedDateLarge = new Date().toLocaleDateString("es-ES", optionsLarge);

    setCurrentDate({ small: formattedDateSmall, large: formattedDateLarge });

    const fetchWeather = async () => {
      try {
        const data = await getWeather('Grau'); 
        setWeatherToday(data.list[0].main);
        setWeatherTomorrow(data.list[8].main);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

  useEffect(() => {
    const scriptPaths = [
      "../assets/js/bootstrap.bundle.min.js",
      "../assets/js/jquery.min.js",
      "../assets/plugins/simplebar/js/simplebar.min.js",
      "../assets/plugins/metismenu/js/metisMenu.min.js",
      "../assets/plugins/perfect-scrollbar/js/perfect-scrollbar.js",
      "../assets/plugins/vectormap/jquery-jvectormap-2.0.2.min.js",
      "../assets/plugins/vectormap/jquery-jvectormap-world-mill-en.js",
      "../assets/js/app.js",
    ];

    const loadScript = (path: string) => {
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
        } catch (error) {
          console.error(`Failed to load script: ${scriptPath}`, error);
        }
      }
      console.log("All scripts loaded successfully.");
    };

    loadScripts();
  }, []);

  const { user } = useAuth() as { user: User };
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
              <h4
                className="logo-text text-danger"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                LAS BAMBAS
              </h4>
            </div>
            <div className="toggle-icon ms-auto">
              <i className="bx bx-arrow-back text-danger" />
            </div>
          </div>
          <ul className="metismenu" id="menu">
            {(user?.Rol === 1 || user?.Rol === 2) && (
              <li className="">
                <NavLink to="/">
                  <div className="parent-icon">
                    <i className="bx bx-grid-alt" />
                  </div>
                  <div className="menu-title">PANEL PRINCIPAL</div>
                </NavLink>
              </li>
            )}
            {user?.Rol === 3 && (
              <li className="mm-active">
                <NavLink to="/administrador">
                  <div className="parent-icon">
                    <i className="bx bx-grid-alt" />
                  </div>
                  <div className="menu-title">PANEL PRINCIPAL</div>
                </NavLink>
              </li>
            )}
            {user?.Rol === 4 && (
              <li className="mm-active">
                <NavLink to="/administrador">
                  <div className="parent-icon">
                    <i className="bx bx-grid-alt" />
                  </div>
                  <div className="menu-title">PANEL PRINCIPAL</div>
                </NavLink>
              </li>
            )}
            <li className="menu-label">PANEL DE CONTROL</li>
            <li>
              <NavLink to="/areadejuego/">
                <div className="parent-icon">
                  <i className="bx bx-baseball" />
                </div>
                <div className="menu-title">Área de juego</div>
              </NavLink>
            </li>

            <li className="menu-label">Configuración</li>
            {user?.Rol === 4 && (
              <>
                <li className="">
                  <NavLink to="/reportes">
                    <div className="parent-icon">
                      <i className="bx bx-bar-chart" />
                    </div>
                    <div className="menu-title">Reportes</div>
                  </NavLink>
                </li>
                <li>
                  <a className="has-arrow" href="#">
                    <div className="parent-icon">
                      <i className="bx bx-user" />
                    </div>
                    <div className="menu-title">Usuarios</div>
                  </a>

                  <ul>
                    <li>
                      <NavLink to="/usuarios/">
                        <i className="bx bx-radio-circle" />
                        Todos
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/nuevousuario/">
                        <i className="bx bx-radio-circle" />
                        Nuevo usuario
                      </NavLink>
                    </li>
                  </ul>
                </li>
              </>
            )}

            <li>
              <a href="https://jheysonjhairpro.ccontrolz.com/" target="_blank">
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
              <h5 className="d-lg-none">{currentDate.small}</h5>
              <h5 className="d-none d-lg-block">{currentDate.large}</h5>
              <div className="top-menu ms-auto">
                <ul className="navbar-nav align-items-center gap-1">
                  <i
                    className="bx bxs-sun"
                    style={{
                      fontSize: "29px",
                      marginLeft: "20px",
                      color: "#edae25",
                    }}
                  ></i>
                  <div
                    className="col text-center "
                    style={{ marginRight: "40px" }}
                  >
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      Hoy día
                    </h6>
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                    {weatherToday?.temp}ºC
                    </h6>
                  </div>
                  <i
                    className="bx bxs-moon"
                    style={{ fontSize: "24px", color: "#2C3E50" }}
                  ></i>
                  <div
                    className="col text-center"
                    style={{ marginRight: "20px" }}
                  >
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      Mañana
                    </h6>
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                    {weatherTomorrow?.temp}ºC
                    </h6>
                  </div>

                  <i
                    className="bx bx-time"
                    style={{ fontSize: "24px", color: "#2C3E50" }}
                  ></i>
                  <div
                    className="col text-center"
                    style={{ marginRight: "20px" }}
                  >
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      Turno: {user?.Shift !== "" ? user?.Shift : "Desabilitado"}
                    </h6>
                  </div>
                  <i
                    className="bx bx-user-circle"
                    style={{ fontSize: "24px", color: "#2C3E50" }}
                  ></i>
                  <div
                    className="col text-center"
                    style={{ marginRight: "20px" }}
                  >
                    <h6 className="m-0" style={{ fontSize: "13px" }}>
                      Area: {user?.Area !== "" ? user?.Area : "Desabilitado"}
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
                    src="../../assets/images/avatars/avatar-1.png"
                    className="user-img"
                    alt="user avatar"
                  />
                  <div className="user-info">
                    <p className="user-name mb-0">{user?.FirstName}</p>
                    <p className="designattion mb-0">
                      {user?.Rol === 1
                        ? "EXCLUSIVO"
                        : user?.Rol === 2
                        ? "TRABAJADOR"
                        : user?.Rol === 3
                        ? "CANCHA DEPORTIVA"
                        : user?.Rol === 4
                        ? "ADMINISTRADOR"
                        : ""}
                    </p>
                  </div>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a
                      className="dropdown-item d-flex align-items-center"
                      href="/"
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
                      href="/"
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
            Copyright © LAS BAMBAS 2024. Todos los derechos reservados.
          </p>
        </footer>
      </div>
    </>
  );
}

export default AppLayout;
