import { useState, useEffect } from "react";
import { FaTrash, FaLock, FaUnlock } from "react-icons/fa";
import Swal from "sweetalert2";

import { User } from "../../../types/User";
import {
  obtenerUsuarios,
  eliminarUsuario,
  bloquearUsuario,
  desbloquearUsuario,
} from "../../../services/Usuario";

export function Users() {
  const [usuarios, setUsuarios] = useState<User[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [UsuariosPerPage] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");

  const indexOfLastUsuario = currentPage * UsuariosPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - UsuariosPerPage;
  const currentUsuarios = usuarios.slice(
    indexOfFirstUsuario,
    indexOfLastUsuario
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  const filteredUsuarios = currentUsuarios.filter((usuario) =>
    Object.values(usuario).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  //---------------------------------------------------------------- GET USERS
  useEffect(() => {
    const fetchData = async () => {
      const data = await obtenerUsuarios();
      setUsuarios(data);
    };
    fetchData();
  }, []);

  //---------------------------------------------------------------- GET DELETE
  const handleEliminarUsuario = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, elimínalo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        await eliminarUsuario(id);
        const updatedUsuarios = usuarios.filter(
          (usuario) => usuario.IdUser !== id
        );
        setUsuarios(updatedUsuarios);

        await Swal.fire(
          "¡Eliminado!",
          "El usuario ha sido eliminado.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al eliminar el usuario", "error");
    }
  };

  //---------------------------------------------------------------- GET BLOCK
  const handleBloquearUsuario = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, bloquearlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        await bloquearUsuario(id);
        const updatedUsuarios = usuarios.map((usuario) =>
          usuario.IdUser === id ? { ...usuario, IndActive: false } : usuario
        );
        setUsuarios(updatedUsuarios);

        Swal.fire("¡Bloqueado!", "El usuario ha sido bloqueado.", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al bloquear el usuario", "error");
    }
  };

  //---------------------------------------------------------------- GET UNLOCK
  const handleDesbloquearUsuario = async (id: number) => {
    try {
      const confirmacion = await Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, desbloquearlo",
        cancelButtonText: "Cancelar",
      });

      if (confirmacion.isConfirmed) {
        await desbloquearUsuario(id);
        const updatedUsuarios = usuarios.map((usuario) =>
          usuario.IdUser === id ? { ...usuario, IndActive: true } : usuario
        );
        setUsuarios(updatedUsuarios);

        Swal.fire(
          "¡Desbloqueado!",
          "El usuario ha sido desbloqueado.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error", "Hubo un error al desbloquear el usuario", "error");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
          <div className="breadcrumb-title pe-3">Usuario</div>
          <div className="ps-3">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 p-0">
                <li className="breadcrumb-item">
                  <a href="#">
                    <i className="bx bx-home-alt" />
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Lista de usuarios
                </li>
              </ol>
            </nav>
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar usuario..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="table-responsive">
          <table
            id="example"
            className="table table-striped table-bordered"
            style={{ width: "100%" }}
          >
            <thead>
              <tr>
                <th>Area</th>
                <th>Nombres y apellidos</th>
                <th>DNI</th>
                <th>Contraseña</th>
                <th>Teléfono</th>
                <th>Email</th>
                <th>Turno</th>
                <th>ROL</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsuarios.map((usuario, index) => (
                <tr key={index}>
                  <td>{usuario.NameArea}</td>
                  <td>{usuario.FirstName + " " + usuario.LastName}</td>
                  <td>{usuario.Dni}</td>
                  <td>{usuario.Password}</td>
                  <td>{usuario.PhoneNumber}</td>
                  <td>{usuario.Mail}</td>
                  <td>{usuario.Shift !== "" ? usuario.Shift : "Sin turno"}</td>
                  <th>
                    {usuario.Rol === 1 && "OPERACIONES MINA"}
                    {usuario.Rol === 2 && "TRAB. GERENCIAS"}
                    {usuario.Rol === 3 && "ADMIN. CANCHA"}
                    {usuario.Rol === 4 && "ADMINISTRADOR"}
                  </th>
                  <td>
                    {usuario.IndActive ? (
                      <button
                        className="btn btn-success btn-sm"
                        style={{ marginRight: "6px" }}
                        title="Bloquear"
                        onClick={() =>
                          handleBloquearUsuario(usuario.IdUser || 0)
                        }
                      >
                        <FaUnlock />
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning btn-sm"
                        style={{ marginRight: "6px" }}
                        title="Desbloquear"
                        onClick={() =>
                          handleDesbloquearUsuario(usuario.IdUser || 0)
                        }
                      >
                        <FaLock />
                      </button>
                    )}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleEliminarUsuario(usuario.IdUser || 0)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ul className="pagination justify-content-center">
          {usuarios.map((_, index) => (
            <li key={index} className="page-item">
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
