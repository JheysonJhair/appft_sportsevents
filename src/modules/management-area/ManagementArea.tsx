import React, { useState, useEffect } from "react";
import { fetchGerencias } from "../../services/Gerencia";
import { fetchAreas } from "../../services/Area";
import { Management } from "../../types/Management";
import { Area } from "../../types/Area";

export function ManagementArea() {
  const [, setGerencias] = useState<Management[]>([]);
  const [, setAreas] = useState<Area[]>([]);
  const [currentGerencias, setCurrentGerencias] = useState<Management[]>([]);
  const [currentAreas, setCurrentAreas] = useState<Area[]>([]);
  const [currentPageGerencias, setCurrentPageGerencias] = useState(1);
  const [currentPageAreas, setCurrentPageAreas] = useState(1);
  const [itemsPerPage] = useState(11);
  const [searchTermGerencias, setSearchTermGerencias] = useState("");
  const [searchTermAreas, setSearchTermAreas] = useState("");

  useEffect(() => {
    const getGerenciasAndAreas = async () => {
      try {
        const gerenciasData = await fetchGerencias();
        setGerencias(gerenciasData);
        setCurrentGerencias(gerenciasData);

        const areasData = await fetchAreas();
        setAreas(areasData);
        setCurrentAreas(areasData);
      } catch (error) {
        console.error(error);
      }
    };

    getGerenciasAndAreas();
  }, []);

  const paginateGerencias = (pageNumber: number) => {
    setCurrentPageGerencias(pageNumber);
  };

  const paginateAreas = (pageNumber: number) => {
    setCurrentPageAreas(pageNumber);
  };

  const handleGerenciasSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermGerencias(e.target.value);
    setCurrentPageGerencias(1);
  };

  const handleAreasSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTermAreas(e.target.value);
    setCurrentPageAreas(1);
  };

  const filteredGerencias = currentGerencias.filter((gerencia) =>
    gerencia.NameManagement.toLowerCase().includes(
      searchTermGerencias.toLowerCase()
    )
  );

  const filteredAreas = currentAreas.filter((area) =>
    area.NameArea.toLowerCase().includes(searchTermAreas.toLowerCase())
  );

  const indexOfLastGerencia = currentPageGerencias * itemsPerPage;
  const indexOfFirstGerencia = indexOfLastGerencia - itemsPerPage;
  const currentGerenciasPage = filteredGerencias.slice(
    indexOfFirstGerencia,
    indexOfLastGerencia
  );

  const indexOfLastArea = currentPageAreas * itemsPerPage;
  const indexOfFirstArea = indexOfLastArea - itemsPerPage;
  const currentAreasPage = filteredAreas.slice(
    indexOfFirstArea,
    indexOfLastArea
  );

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Gerencia y área</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Todas las gerencias y áreas
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="row ">
          <div className="col-12 col-lg-5 ">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar gerencia..."
                value={searchTermGerencias}
                onChange={handleGerenciasSearch}
              />
            </div>
            <div className="table-responsive">
              <table
                id="gerenciasTable"
                className="table table-striped table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Nombre de gerencia</th>
                  </tr>
                </thead>
                <tbody>
                  {currentGerenciasPage.map((gerencia, index) => (
                    <tr key={index}>
                      <td>{gerencia.IdManagement}</td>
                      <td>{gerencia.NameManagement}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="pagination justify-content-center">
              {Array.from(
                { length: Math.ceil(filteredGerencias.length / itemsPerPage) },
                (_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginateGerencias(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
          <div className="col-12 col-lg-7 ">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar área..."
                value={searchTermAreas}
                onChange={handleAreasSearch}
              />
            </div>
            <div className="table-responsive">
              <table
                id="areasTable"
                className="table table-striped table-bordered"
                style={{ width: "100%" }}
              >
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th>Nombre de área</th>
                    <th>Fecha de creación</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAreasPage.map((area, index) => (
                    <tr key={index}>
                      <td>{area.IdArea}</td>
                      <td>{area.NameArea}</td>
                      <td>{area.Date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <ul className="pagination justify-content-center">
              {Array.from(
                { length: Math.ceil(filteredAreas.length / itemsPerPage) },
                (_, index) => (
                  <li key={index} className="page-item">
                    <button
                      onClick={() => paginateAreas(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
