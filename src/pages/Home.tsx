import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";

import { useAuth } from "../hooks/AuthContext";
import { formatHour, formatDate, formatDate2 } from "../utils/util";
import { EventData } from "../types/Eventos";
import { Field } from "../types/Field";
import { fetchUserDataByDNI } from "../services/Login";
import {
  obtenerHorarioCancha1,
  obtenerHorarioCancha2,
  crearHorarioCancha1,
  crearHorarioCancha2,
  obtenerHorarioCancha1PorId,
  obtenerHorarioCancha2PorId,
} from "../services/Horario";

export function HomePage() {
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [showAlert, setShowAlert] = useState(false);
  const [ayuda, setAyuda] = useState<any>(false);

  const [events, setEvents] = useState<EventData[]>([]);
  const [listPlayer, setListPlayer] = useState<string>("");
  const [eventDetails, setEventDetails] = useState<any>(null);

  const selectedDate = selectedEvent && new Date(selectedEvent.start).getDate();
  const selectedMonth =
    selectedEvent && new Date(selectedEvent.start).getMonth() + 1;
  const selectedYear =
    selectedEvent && new Date(selectedEvent.start).getFullYear();
  const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDate}`;

  //---------------------------------------------------------------- GET DATA FIELD 1 AND 2 - RENDER
  useEffect(() => {
    const intervalId = setInterval(fetchEvents, 2000);
    return () => clearInterval(intervalId);
  }, []);

  async function fetchEvents() {
    try {
      let horario;
      if (user?.Rol === 1) {
        horario = await obtenerHorarioCancha1();
      } else if (user?.Rol === 2) {
        horario = await obtenerHorarioCancha2();
      } else {
        throw new Error("Rol de usuario no válido");
      }
      const initialEvents: EventData[] = horario.map((event) => ({
        title: event.FirstName,
        area: event.NameArea,
        jugadores: event.ListPlayer,
        laboratorio: event.NameManagement,
        start: `${event.DateDay}T${event.StartTime}`,
        end: `${event.DateDay}T${event.EndTime}`,
        color: event.areaIdArea === 1 ? "#2C3E50" : "#44a7ea",
        IdField2Entity: event.IdField2Entity,
        IdField1Entity: event.IdField1Entity,
      }));

      setEvents(initialEvents);
    } catch (error) {
      console.error("Error al obtener el horario:", error);
    }
  }

  function renderEventContent(eventInfo: any) {
    const truncateText = (text: string, maxLength: number) => {
      return text.length > maxLength
        ? text.substring(0, maxLength) + "..."
        : text;
    };
    return (
      <div>
        <span
          className="view-icon"
          onClick={() => handleViewDetails(eventInfo.event)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "0px",
            right: "4px",
          }}
        >
          <i
            className="bx bx-show"
            title="Ver"
            style={{ fontSize: "17px", color: "#FFF" }}
          ></i>
        </span>
        <div className="fc-event-title">{eventInfo.event.title}</div>
        <div className="fc-event-title">
          {truncateText(eventInfo.event.extendedProps.area, 16)}
        </div>
      </div>
    );
  }

  //---------------------------------------------------------------- SELECT EVENT - REGISTER
  function handleSelectEvent(event: any) {
    if (user?.Rol === 2) {
      const startTime = new Date(event.start).getTime();
      const endTime = new Date(event.end).getTime();
      const duration = endTime - startTime;
      const oneHourInMilliseconds = 3600000;
      if (
        duration > oneHourInMilliseconds ||
        duration < oneHourInMilliseconds
      ) {
        Swal.fire({
          title: "Error",
          text: "Debe seleccionar solo una hora",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        setSelectedEvent(event);
      }
    } else {
      setSelectedEvent(event);
    }
  }
  async function handleConfirmReservation() {
    try {
      if (!selectedEvent || !listPlayer.trim()) {
        Swal.fire({
          title: "Error",
          text: "Debe ingresar la lista de jugadores",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
      const selectedDate = new Date(selectedEvent.start);
      const startOfWeek = new Date(
        selectedDate.setDate(
          selectedDate.getDate() -
            selectedDate.getDay() +
            (selectedDate.getDay() === 0 ? -6 : 1)
        )
      );
      const endOfWeek = new Date(
        selectedDate.setDate(selectedDate.getDate() - selectedDate.getDay() + 7)
      );

      let horario: Partial<Field> = {
        IdUser: user?.IdUser || 0,
        StartTime: `${formatHour(selectedEvent.start)}:00`,
        EndTime: `${formatHour(selectedEvent.end)}:00`,
        DateDay: formatDate(formattedDate),
        StartWeekend: formatDate2(startOfWeek),
        EndWeekend: formatDate2(endOfWeek),
        ListPlayer: listPlayer,
      };
      let response: { msg: string; success: boolean };

      if (user?.Rol === 1) {
        response = await crearHorarioCancha1(horario);
        if (response.success) {
          Swal.fire({
            title: "CANCHA 1!",
            text: "El horario se registró correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        }
      } else if (user?.Rol === 2) {
        response = await crearHorarioCancha2(horario);
        if (response.success) {
          Swal.fire({
            title: "CANCHA 2!",
            text: "El horario se registró correctamente!",
            icon: "success",
            confirmButtonText: "Aceptar",
          });
        } else if (!response.success) {
          Swal.fire({
            title: "Horario completo!!",
            text: response.msg + "",
            icon: "warning",
            confirmButtonText: "Aceptar",
          });
        }
      } else {
        Swal.fire({
          title: "Error!",
          text: "Oppss, algo salio mal!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
      setShowAlert(true);
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
    } finally {
      handleCloseModal();
    }
  }
  function handleCloseModal() {
    setSelectedEvent(null);
    setListPlayer("");
  }

  //---------------------------------------------RENIEC LIST
  async function handleAddPlayer() {
    const inputDni = document.getElementById("inputDni") as HTMLInputElement;
    const dni = inputDni.value.trim();

    if (dni.length !== 8 || isNaN(Number(dni))) {
      Swal.fire({
        title: "Error",
        text: "Debe ingresar un DNI válido de 8 dígitos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    try {
      const response = await fetchUserDataByDNI(dni);
      if (response) {
        const playerName = `${response.nombres} ${response.apellidoPaterno} ${response.apellidoMaterno}`;
        setListPlayer((prevList) =>
          prevList ? `${prevList}, ${playerName}` : playerName
        );
        inputDni.value = "";
      } else {
        Swal.fire({
          title: "Error",
          text: "No se encontró información para el DNI ingresado",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al consultar la información del DNI",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }

  //---------------------------------------------------------------- VIEW EVENT
  async function handleViewDetails(event: any) {
    const fieldId1 = event.extendedProps.IdField1Entity;
    const fieldId2 = event.extendedProps.IdField2Entity;
    try {
      if (fieldId1) {
        const response = await obtenerHorarioCancha1PorId(fieldId1);
        setEventDetails(response);
        setAyuda(true);
      } else if (fieldId2) {
        const response = await obtenerHorarioCancha2PorId(fieldId2);
        setEventDetails(response);
        setAyuda(true);
      }
    } catch (error: any) {
      console.error(error);
    }
  }
  function handleCloseModal2() {
    setAyuda(false);
    setEventDetails(null);
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <div className={user && user.Shift === "Mañana" ? "disabled" : ""}>
              <h5 className="card-title">Turno mañana</h5>
              <hr />
              <div className="table-responsive">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  locales={[esLocale]}
                  locale="es"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                  }}
                  initialView="timeGridWeek"
                  initialDate={new Date()}
                  nowIndicator={true}
                  dayMaxEvents={true}
                  editable={false}
                  selectable={true}
                  slotMinTime="06:00:00"
                  slotMaxTime="09:00:00"
                  contentHeight="auto"
                  allDaySlot={false}
                  slotLabelInterval={{ hour: 1 }}
                  slotLabelFormat={{ hour: "numeric", hour12: true }}
                  selectOverlap={false}
                  events={events}
                  eventContent={renderEventContent}
                  select={handleSelectEvent}
                />
              </div>
            </div>
            <div className={user && user.Shift === "Noche" ? "disabled" : ""}>
              <h5 className="card-title mt-3">Turno tarde</h5>
              <hr />
              <div className="table-responsive">
                <FullCalendar
                  plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                  locales={[esLocale]}
                  locale="es"
                  headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                  }}
                  initialView="timeGridWeek"
                  initialDate={new Date()}
                  nowIndicator={true}
                  dayMaxEvents={true}
                  editable={false}
                  selectable={true}
                  slotMinTime="18:00:00"
                  slotMaxTime="21:00:00"
                  contentHeight="auto"
                  allDaySlot={false}
                  slotLabelInterval={{ hour: 1 }}
                  slotLabelFormat={{ hour: "numeric", hour12: true }}
                  selectOverlap={false}
                  events={events}
                  eventContent={renderEventContent}
                  select={handleSelectEvent}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Reservar Horario
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <p>Usuario: {user?.FirstName}</p>
                <p>Área: {user?.NameArea}</p>
                <p>
                  Horario: {selectedEvent && formatHour(selectedEvent.start)} a{" "}
                  {selectedEvent && formatHour(selectedEvent.end)}
                </p>
                <p>
                  Día:{" "}
                  {selectedEvent &&
                    new Date(selectedEvent.start).toLocaleDateString()}
                </p>
                <div className="mb-3">
                  <div className="row">
                    <label htmlFor="listPlayer" className="form-label">
                      Lista de Jugadores
                    </label>
                    <div className="col-md-5 mb-3">
                      <div className="input-group">
                        <input
                          type="number"
                          className="form-control"
                          id="inputDni"
                          name="Dni"
                          placeholder="Dni"
                          maxLength={8}
                          pattern="\d{8}"
                          title="Ingrese 8 dígitos"
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={handleAddPlayer}
                        >
                          <i className="bx bx-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <textarea
                    className="form-control"
                    id="listPlayer"
                    rows={3}
                    value={listPlayer}
                    onChange={(e) => setListPlayer(e.target.value)}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirmReservation}
                >
                  Confirmar reserva
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedEvent && <div className="modal-backdrop fade show"></div>}
      {ayuda && (
        <div
          className="modal fade show"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
          style={{ display: "block", marginTop: "10px" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Detalles de la reserva
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal2}
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                {eventDetails && (
                  <div>
                    <p>
                      Usuario:{" "}
                      {eventDetails.FirstName && eventDetails.LastName
                        ? eventDetails.FirstName + " " + eventDetails.LastName
                        : "SIN REGISTRO"}
                    </p>
                    <p>
                      Gerencia: {eventDetails.NameManagement || "SIN REGISTRO"}
                    </p>
                    <p>Area: {eventDetails.NameArea || "SIN REGISTRO"}</p>
                    <p>Fecha: {eventDetails.DateDay || "SIN REGISTRO"}</p>
                    <p>
                      Hora Inicio: {eventDetails.StartTime || "SIN REGISTRO"}
                    </p>
                    <p>Hora Fin: {eventDetails.EndTime || "SIN REGISTRO"}</p>
                    <p>
                      Lista de jugadores:{" "}
                      {eventDetails.ListPlayer || "SIN REGISTRO"}
                    </p>
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal2}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {ayuda && <div className="modal-backdrop fade show"></div>}
      {showAlert && (
        <div className="alert alert-danger border-0 bg-danger alert-dismissible fade show py-2 alert-bottom-right">
          <div className="d-flex align-items-center">
            <div className="font-35 text-white">
              <i className="bx bx-info-square" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0 text-white">Nota importante!</h6>
              <div className="text-white">
                No te olvides de llevar tu photocheck
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  );
}
