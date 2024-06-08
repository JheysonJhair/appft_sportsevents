import { useState, useEffect } from "react";

import { fetchReports } from "../../services/Reportes";
import { ReportDay } from "../../types/DayReport";

export function AllReport() {
  const [reports, setReports] = useState<ReportDay[]>([]);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const reportData = await fetchReports();
        setReports(reportData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReportData();
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Reportes</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Todos los reportes y detalles
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <h6 className="mb-0 text-uppercase">Reportes realizados</h6>
        <hr />
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="example"
                className="table table-striped table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Nombre del jugador</th>
                    <th>Descripción del evento</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report, index) => (
                    <tr key={index}>
                      <td>ADMIN. CANCHA</td>
                      <td>{report.Date}</td>
                      <td>{report.NamePlayer}</td>
                      <td>{report.Description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
