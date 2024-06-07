import React, { useState } from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { saveAs } from 'file-saver';

const API_URL = "https://esappsoccer.ccontrolz.com/api";

interface Reservation {
  IdField1Entity: number;
  DateDay: string;
  IdUser: number;
  FirstName: string;
  LastName: string;
  Password: string;
  Dni: string;
  EmployeeCode: string;
  Shift: string;
  PhoneNumber: string;
  Mail: string;
  Rol: number;
  Date: string;
  IndActive: boolean;
}

export function Reportes() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reservationData, setReservationData] = useState<Reservation[]>([]);

  const fetchData = async () => {
    try {
      const requestBody = JSON.stringify({
        StartDate: startDate,
        EndDate: endDate,
      });

      const response = await fetch(`${API_URL}/user/GetUserByDateRange`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setReservationData(responseData.data);
      } else {
        throw new Error("Error fetching reservation reports data.");
      }
    } catch (error) {
      console.error("Error fetching reservation reports data: ", error);
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const renderCharts = () => {
    if (reservationData.length === 0) {
      return <div>No hay datos disponibles</div>;
    }

    const categories = reservationData.map((reservation) => reservation.DateDay);
    const data = reservationData.map((reservation) => reservation.IdField1Entity);

    const options: ApexOptions = {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: categories,
      },
    };

    return (
      <Chart
        options={options}
        series={[{ data: data }]}
        type="bar"
        height={350}
      />
    );
  };

  const handleDownloadExcel = () => {
    const csvData = reservationData.map(reservation => Object.values(reservation).join(',')).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'reservas.csv');
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
              <div className="col-md-3">
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <input
                  type="date"
                  value={endDate}
                  onChange={handleEndDateChange}
                  className="form-control"
                />
              </div>
              <div className="col-md-3">
                <button onClick={fetchData} className="btn btn-primary">Filtrar</button>
              </div>
              <div className="col-md-3">
                <button onClick={handleDownloadExcel} className="btn btn-success">Descargar Excel</button>
              </div>
            </div>
            <div className="card py-3">
              <div className="card-body" style={{ paddingBottom: "25px" }}>
                {renderCharts()}
              </div>
            </div>
            <div className="card mt-3">
              <div className="card-body">
                <h5 className="card-title">Datos de reservas</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Apellido</th>
                      <th>DNI</th>
                      <th>Número de Teléfono</th>
                      <th>Correo Electrónico</th>
                      <th>Gerencia</th>
                      <th>Area</th>
                      <th>Turno</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservationData.map((reservation, index) => (
                      <tr key={index}>
                        <td>{reservation.FirstName}</td>
                        <td>{reservation.LastName}</td>
                        <td>{reservation.Dni}</td>
                        <td>{reservation.PhoneNumber}</td>
                        <td>{reservation.Mail}</td>
                        <td>{reservation.Rol}</td>
                        <td>{reservation.Rol}</td>
                        <td>{reservation.Shift}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
