import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";

import { useAuth } from "../../hooks/AuthContext";
import { formatHour, formatDate, formatDate2 } from "../../utils/util";
import { EventData } from "../../types/Eventos";
import { Field } from "../../types/Field";
import {
  obtenerHorarioCancha1,
  obtenerHorarioCancha2,
  eliminarHorarioCancha1,
  eliminarHorarioCancha2,
  crearHorarioCancha1,
  crearHorarioCancha2,
  obtenerHorarioCancha1PorId,
  obtenerHorarioCancha2PorId,
} from "../../services/Horario";
import { insertarNotificacion } from "../../services/Notification";

export function AdimistratorHome() {
  const { user } = useAuth();
  const [eventsCancha1, setEventsCancha1] = useState<EventData[]>([]);
  const [eventsCancha2, setEventsCancha2] = useState<EventData[]>([]);

  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [selectedCancha, setSelectedCancha] = useState<string>("cancha1");
  const [eventDetails, setEventDetails] = useState<any>(null);

  const [listPlayer, setListPlayer] = useState<string>("");
  const [ayuda, setAyuda] = useState<any>(false);

  const selectedDate = selectedEvent && new Date(selectedEvent.start).getDate();
  const selectedMonth =
    selectedEvent && new Date(selectedEvent.start).getMonth() + 1;
  const selectedYear =
    selectedEvent && new Date(selectedEvent.start).getFullYear();
  const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDate}`;

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEventsCancha1();
      fetchEventsCancha2();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  function handleSelectEvent(event: any) {
    setSelectedEvent(event);
  }

  function handleCloseModal() {
    setSelectedEvent(null);
    setListPlayer("");
    setSelectedCancha("cancha1");
  }
  function handleCloseModal2() {
    setAyuda(false);
    setEventDetails(null);
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
      if (selectedCancha === "cancha1") {
        response = await crearHorarioCancha1(horario);
      } else {
        response = await crearHorarioCancha2(horario);
      }
      if (response.success) {
        Swal.fire({
          title: "CANCHA REGISTRADA!",
          text: "El horario se registró correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Oppss, algo salio mal!",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
    } finally {
      handleCloseModal();
    }
  }

  async function fetchEventsCancha1() {
    try {
      const horarioCancha1 = await obtenerHorarioCancha1();
      const initialEventsCancha1: EventData[] = horarioCancha1.map((event) => ({
        title: event.FirstName,
        area: event.NameArea,
        laboratorio: event.NameManagement,
        start: `${event.DateDay}T${event.StartTime}`,
        end: `${event.DateDay}T${event.EndTime}`,
        color: event.NameArea === "Admin Sistema" ? "#2C3E50" : "#44a7ea",
        IdField1Entity: event.IdField1Entity,
      }));
      setEventsCancha1(initialEventsCancha1);
    } catch (error) {
      console.error("Error al obtener el horario de la Cancha 1:", error);
    }
  }
  
  async function fetchEventsCancha2() {
    try {
      const horarioCancha2 = await obtenerHorarioCancha2();
      const initialEventsCancha2: EventData[] = horarioCancha2.map((event) => ({
        title: event.FirstName,
        area: event.NameArea,
        laboratorio: event.NameManagement,
        start: `${event.DateDay}T${event.StartTime}`,
        end: `${event.DateDay}T${event.EndTime}`,
        color: event.NameArea === "Admin Sistema" ? "#2C3E50" : "#ef8392",
        IdField2Entity: event.IdField2Entity,
      }));
      setEventsCancha2(initialEventsCancha2);
    } catch (error) {
      console.error("Error al obtener el horario de la Cancha 2:", error);
    }
  }
  

  async function handleDelete(event: any) {
    const fieldId1 = event.extendedProps.IdField1Entity;
    const fieldId2 = event.extendedProps.IdField2Entity;

    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, bórralo!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          if (fieldId1) {
            const response = await eliminarHorarioCancha1(fieldId1);
            if (response.success) {
              setEventsCancha1(
                eventsCancha1.filter((e) => e.IdField1Entity !== fieldId1)
              );
              Swal.fire({
                title: "¡Eliminado!",
                text: "Se ha eliminado correctamente!",
                icon: "success",
              });
              const notificationMessage = `Se eliminó la reserva de GERENCIA`;
              await insertarNotificacion(
                notificationMessage,
                user?.IdUser || 0,
                response.IdArea
              );
            }
          } else if (fieldId2) {
            const response = await eliminarHorarioCancha2(fieldId2);
            if (response.success) {
              setEventsCancha2(
                eventsCancha2.filter((e) => e.IdField2Entity !== fieldId2)
              );
              Swal.fire({
                title: "¡Eliminado!",
                text: "Se ha eliminado correctamente!",
                icon: "success",
              });
            }
            const notificationMessage = `Se eliminó la reserva de GERENCIA`;
            await insertarNotificacion(
              notificationMessage,
              user?.IdUser || 0,
              response.IdArea
            );
          }
        } catch (error: any) {
          Swal.fire({
            title: "Error!",
            text: "Error al eliminar el evento: " + error.message,
            icon: "error",
          });
        }
      }
    });
  }

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

  function renderEventContent(eventInfo: any) {
    return (
      <div style={{ position: "relative", padding: "4px" }}>
        <span
          className="delete-icon"
          onClick={() => handleDelete(eventInfo.event)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
        >
          <i
            className="bx bxs-trash"
            title="Eliminar"
            style={{ fontSize: "17px", color: "#FFF" }}
          ></i>
        </span>
        <span
          className="view-icon"
          onClick={() => handleViewDetails(eventInfo.event)}
          style={{
            cursor: "pointer",
            position: "absolute",
            top: "8px",
            right: "28px",
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
          {eventInfo.event.extendedProps.area}
        </div>
      </div>
    );
  }

  function renderCalendar(
    slotMinTime: any,
    slotMaxTime: any,
    eventsData: EventData[]
  ) {
    return (
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
          slotMinTime={slotMinTime}
          slotMaxTime={slotMaxTime}
          contentHeight="auto"
          allDaySlot={false}
          slotLabelInterval={{ hour: 1 }}
          slotLabelFormat={{ hour: "numeric", hour12: true }}
          selectOverlap={false}
          events={eventsData}
          eventContent={renderEventContent}
          select={handleSelectEvent}
        />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">OPERACIONES MINA (Cancha 1)</h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsCancha1)}
            {renderCalendar("18:00:00", "21:00:00", eventsCancha1)}
            <h5 className="card-title mt-3">
              TRABAJADORES GERENCIAS (Cancha 2)
            </h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsCancha2)}
            {renderCalendar("18:00:00", "21:00:00", eventsCancha2)}
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
          style={{ display: "block", marginTop: "40px" }}
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
                <p>Área: {user?.EmployeeCode}</p>
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
                  <label htmlFor="listPlayer" className="form-label">
                    Lista de Jugadores
                  </label>
                  <textarea
                    className="form-control"
                    id="listPlayer"
                    rows={3}
                    value={listPlayer}
                    onChange={(e) => setListPlayer(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="selectedCancha" className="form-label">
                    Seleccionar Cancha
                  </label>
                  <select
                    className="form-select"
                    id="selectedCancha"
                    value={selectedCancha}
                    onChange={(e) => setSelectedCancha(e.target.value)}
                  >
                    <option value="cancha1">Cancha 1</option>
                    <option value="cancha2">Cancha 2</option>
                  </select>
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
          style={{ display: "block", marginTop: "90px"}}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Detalles del evento
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
                      {eventDetails.FirstName + " " + eventDetails.LastName}
                    </p>
                    <p>Gerencia: {eventDetails.NameManagement}</p>
                    <p>Area: {eventDetails.NameArea}</p>
                    <p>Fecha: {eventDetails.DateDay}</p>
                    <p>Hora Inicio: {eventDetails.StartTime}</p>
                    <p>Hora Fin: {eventDetails.EndTime}</p>
                    <p>Lista de jugadores: {eventDetails.ListPlayer}</p>
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
    </div>
  );
}
