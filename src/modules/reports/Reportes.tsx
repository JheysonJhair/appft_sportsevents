import { useEffect } from "react";
export function Reportes() {
  useEffect(() => {
    const scriptPaths = [
      "../assets/plugins/apexcharts-bundle/js/apexcharts.min.js",
      "../assets/plugins/apexcharts-bundle/js/apex-custom.js",
      "../assets/plugins/chartjs/js/chart.js",
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
                  Horarios
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 mx-auto">
            <h6 className="mb-0 text-uppercase">Column Chart</h6>
            <hr />
            <div className="card">
              <div className="card-body">
                <div id="chart4" />
              </div>
            </div>
            <div className="row">
              <div className="col-md-7">
                <h6 className="mb-0 text-uppercase">Multi-Line Chart</h6>
                <hr />
                <div className="card">
                  <div className="card-body">
                    <div id="chart2" />
                  </div>
                </div>
              </div>
              <div className="col-md-5 ">
                <h6 className="mb-0 text-uppercase">Pie Chart</h6>
                <hr />
                <div className="card py-3">
                  <div className="card-body" style={{ paddingBottom: "25px" }}>
                    <div id="chart8" />
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
