export function AreaJuego() {
  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Area de juego</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="javascript:;">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Cancha Deportiva
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-7">
              <div className="card bg-transparent shadow-none rounded-0 mb-0">
                <div className="card-body">
                  <img
                    src="../../assets/images/sport.svg"
                    className="img-fluid auth-img-cover-login"
                    width={720}
                    alt="SVG Image"
                  />
                </div>
              </div>
            </div>
            <div className="col-md-5">
              <img
                src="https://img.freepik.com/vector-gratis/campo-futbol-verde_225004-1137.jpg?w=740&t=st=1713719078~exp=1713719678~hmac=f24a0d3699fdeadd306d961c495b03915feda00783c2373ec4ec9f18166085ec"
                className="img-fluid"
                alt="Área Deportiva"
                width={350}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
