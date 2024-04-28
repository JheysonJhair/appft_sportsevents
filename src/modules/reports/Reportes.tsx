import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export function Reportes() {
  const dataBarra = {
    series: [
      {
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        type: "bar",
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
        ],
      },
    } as ApexOptions,
  };

  const dataCircular = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Equipo A", "Equipo B", "Equipo C", "Equipo D", "Equipo E"],
    } as ApexOptions,
  };
  const dataMultiLinea = {
    series: [
      {
        name: "Serie 1",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Serie 2",
        data: [42, 53, 28, 60, 72, 89, 95, 112, 135],
      },
      {
        name: "Serie 3",
        data: [20, 38, 45, 56, 61, 73, 82, 94, 105],
      },
    ],
    options: {
      chart: {
        type: "line",
      },
      xaxis: {
        categories: [
          "Enero",
          "Febrero",
          "Marzo",
          "Abril",
          "Mayo",
          "Junio",
          "Julio",
          "Agosto",
          "Septiembre",
        ],
      },
      legend: {
        position: "top",
      },
    } as ApexOptions,
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
            <h6 className="mb-0 text-uppercase">Column Chart</h6>
            <hr />{" "}
            <div className="card py-3">
              <div className="card-body" style={{ paddingBottom: "25px" }}>
                <Chart
                  options={dataBarra.options}
                  series={dataBarra.series}
                  type="bar"
                  height={350}
                />{" "}
              </div>
            </div>
            <div className="row">
              <div className="col-md-7">
                <h6 className="mb-0 text-uppercase">Multi-Line Chart</h6>
                <hr />{" "}
                <div className="card py-3">
                  <div className="card-body" style={{ paddingBottom: "25px" }}>
                    <Chart
                      options={dataMultiLinea.options}
                      series={dataMultiLinea.series}
                      type="line"
                      height={350}
                    />{" "}
                  </div>
                </div>
              </div>
              <div className="col-md-5 ">
                <h6 className="mb-0 text-uppercase">Pie Chart</h6>
                <hr />
                <div className="card py-3">
                  <div className="card-body" style={{ paddingTop: "40px" ,paddingBottom: "40px" }}>
                    <Chart
                      options={dataCircular.options}
                      series={dataCircular.series}
                      type="donut"
                      height={350}
                    />
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
