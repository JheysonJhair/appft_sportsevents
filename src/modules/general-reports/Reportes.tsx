import React, { useState } from "react";
import { saveAs } from "file-saver";

import {
  ReportUser,
  ReportReservationField1,
  ReportReservationField2,
  ReportAdministrator,
  ReportAdministratorReservation,
} from "../../types/Reports";
import {
  fetchUserData,
  fetchReservationData,
  fetchChannel2Data,
  fetchAdministratorReports,
  fetchAdministratorReservations,
} from "../../services/Reportes";

export function Reportes() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [userData, setUserData] = useState<ReportUser[]>([]);
  const [reservationData, setReservationData] = useState<
    ReportReservationField1[]
  >([]);

  const [reservationData2, setReservationData2] = useState<
    ReportReservationField2[]
  >([]);

  const [administratorReports, setAdministratorReports] = useState<
    ReportAdministrator[]
  >([]);

  const [administratorReservations, setAdministratorReservations] = useState<
    ReportAdministratorReservation[]
  >([]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  //---------------------------------------------------------------- GET DATA
  const fetchData = async () => {
    try {
      const userData = await fetchUserData(startDate, endDate);
      setUserData(userData);

      const reservationData = await fetchReservationData(startDate, endDate);
      console.log(reservationData);
      setReservationData(reservationData);

      const reservationData2 = await fetchChannel2Data(startDate, endDate);
      setReservationData2(reservationData2);

      const administratorReportsData = await fetchAdministratorReports(
        startDate,
        endDate
      );
      setAdministratorReports(administratorReportsData);

      const administratorReservationsData =
        await fetchAdministratorReservations(startDate, endDate);
      setAdministratorReservations(administratorReservationsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //---------------------------------------------------------------- DOWNLOAD EXCEL
  const handleDownloadUserExcel = () => {
    const csvData = userData
      .map((user) => Object.values(user).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "usuarios.csv");
  };

  const handleDownloadReservationExcel = () => {
    const csvData = reservationData
      .map((reservation) => Object.values(reservation).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "reservasOperacionesMina.csv");
  };

  const handleDownloadReservation2Excel = () => {
    const csvData = reservationData2
      .map((reservationData2) => Object.values(reservationData2).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "reservasTrabajadoresGerencias.csv");
  };

  const handleDownloadAdministratorReportsExcel = () => {
    const csvData = administratorReports
      .map((report) => Object.values(report).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "reportesAdministrador.csv");
  };

  const handleDownloadAdministratorReservationsExcel = () => {
    const csvData = administratorReservations
      .map((reservation) => Object.values(reservation).join(","))
      .join("\n");
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "reservasAdministrador.csv");
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Reportes</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a>
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Horarios
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 mx-auto">
            <div className="row mb-3">
              <div className="col-md-5">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-5">
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-2">
                <button onClick={fetchData} className="btn btn-danger">
                  Obtener Datos
                </button>
              </div>
            </div>
            <h6 className="mb-0 text-uppercase">TODOS LOS USUARIOS</h6>
            <hr />
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Datos de usuarios</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>DNI</th>
                        <th>Número de Teléfono</th>
                        <th>Correo Electrónico</th>
                        <th>Gerencia</th>
                        <th>AREA</th>
                        <th>Turno</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user, index) => (
                        <tr key={index}>
                          <td>{user.FirstName}</td>
                          <td>{user.LastName}</td>
                          <td>{user.Dni}</td>
                          <td>{user.PhoneNumber}</td>
                          <td>{user.Mail}</td>
                          <td>{user.NameManagement}</td>
                          <td>{user.NameArea}</td>
                          <td>{user.Shift}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleDownloadUserExcel}
                  className="btn btn-success mt-3"
                  style={{ backgroundColor: "#1f7145" }}
                >
                  <i className="bx bx-download" /> Descargar Excel
                </button>
              </div>
            </div>
            <h6 className="mb-0 text-uppercase">
              TODAS LAS RESERVAS DE OPERACIONES MINA
            </h6>
            <hr />
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Datos de reservas</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Día</th>
                        <th>Hora</th>
                        <th>Usuario</th>
                        <th>Jugadores</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservationData.map((reservation, index) => (
                        <tr key={index}>
                          <td>{reservation.DateRegister}</td>
                          <td>{reservation.DateDay}</td>
                          <td>
                            {reservation.StartTime +
                              " a " +
                              reservation.EndTime}
                          </td>
                          <td>
                            {reservation.ListPlayer === "NINGUNO"
                              ? "Administrador"
                              : "Operaciones Mina"}
                          </td>
                          <td>{reservation.ListPlayer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleDownloadReservationExcel}
                  className="btn btn-success mt-3"
                  style={{ backgroundColor: "#1f7145" }}
                >
                  <i className="bx bx-download" /> Descargar Excel
                </button>
              </div>
            </div>
            <h6 className="mb-0 text-uppercase">
              TODAS LAS RESERVAS DE TRABAJADORES GERENCIAS
            </h6>
            <hr />
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Datos de reservas</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Día</th>
                        <th>Hora</th>
                        <th>Usuario</th>
                        <th>Area</th>
                        <th>Jugadores</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservationData2.map((reservation2, index) => (
                        <tr key={index}>
                          <td>{reservation2.DateRegister}</td>
                          <td>{reservation2.DateDay}</td>
                          <td>
                            {reservation2.StartTime +
                              " a " +
                              reservation2.EndTime}
                          </td>
                          <td>Trabajador gerencia</td>
                          <td>{reservation2.User.NameArea}</td>
                          <td>{reservation2.ListPlayer}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleDownloadReservation2Excel}
                  className="btn btn-success mt-3"
                  style={{ backgroundColor: "#1f7145" }}
                >
                  <i className="bx bx-download" /> Descargar Excel
                </button>
              </div>
            </div>
            <h6 className="mb-0 text-uppercase">
              TODOS LOS INFORMES DEL ADMINISTRADOR DE CANCHA
            </h6>
            <hr />
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Datos de informes</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Gerencia</th>
                        <th>Area</th>
                        <th>Jugador agredido</th>
                        <th>Descripcion de agrecion</th>
                      </tr>
                    </thead>
                    <tbody>
                      {administratorReports.map(
                        (administratorReports, index) => (
                          <tr key={index}>
                            <td>{administratorReports.Date}</td>
                            <td>{administratorReports.NameManagement}</td>
                            <td>{administratorReports.NameArea}</td>
                            <td>{administratorReports.NamePlayer}</td>
                            <td>{administratorReports.Description}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleDownloadAdministratorReportsExcel}
                  className="btn btn-success mt-3"
                  style={{ backgroundColor: "#1f7145" }}
                >
                  <i className="bx bx-download" /> Descargar Excel
                </button>
              </div>
            </div>
            <h6 className="mb-0 text-uppercase">
              TODOS LAS RESERVAS DEL ADMINISTRADOR
            </h6>
            <hr />
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Datos de reservas</h5>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Fecha</th>
                        <th>Día</th>
                        <th>Hora</th>
                        <th>Mensaje</th>
                      </tr>
                    </thead>
                    <tbody>
                      {administratorReservations.map(
                        (administratorReservations, index) => (
                          <tr key={index}>
                            <td>{administratorReservations.DateRegister}</td>
                            <td>{administratorReservations.DateDay}</td>
                            <td>{administratorReservations.Time}</td>
                            <td>{administratorReservations.Message}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
                <button
                  onClick={handleDownloadAdministratorReservationsExcel}
                  className="btn btn-success mt-3"
                  style={{ backgroundColor: "#1f7145" }}
                >
                  <i className="bx bx-download" /> Descargar Excel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
