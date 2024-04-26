import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useAuth } from "../hooks/AuthContext";
import { EventData } from "../types/Eventos";
import {
  obtenerHorarioCancha1,
  obtenerHorarioCancha2,
  crearHorarioCancha1,
  crearHorarioCancha2,
} from "../services/Horario";
import { Horario } from "../types/Horarios";
import Swal from "sweetalert2";

export function HomePage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const selectedDate = selectedEvent && new Date(selectedEvent.start).getDate();
  const selectedMonth =
    selectedEvent && new Date(selectedEvent.start).getMonth() + 1;
  const selectedYear =
    selectedEvent && new Date(selectedEvent.start).getFullYear();
  const formattedDate = `${selectedYear}-${selectedMonth}-${selectedDate}`;
  useEffect(() => {
    const intervalId = setInterval(fetchEvents, 1000);

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
        area: event.Area,
        laboratorio: event.Laboratory,
        start: `${event.DateDay}T${event.StartTime}`,
        end: `${event.DateDay}T${event.EndTime}`,
        color: "#44a7ea",
      }));

      setEvents(initialEvents);
    } catch (error) {
      console.error("Error al obtener el horario:", error);
    }
  }

  function renderEventContent(eventInfo: any) {
    return (
      <div>
        <div className="fc-event-title">{eventInfo.event.title}</div>
        <div className="fc-event-title">
          {eventInfo.event.extendedProps.area}
        </div>
      </div>
    );
  }

  function handleSelectEvent(event: any) {
    if (user?.Rol === 2) {
      const startTime = new Date(event.start).getTime();
      const endTime = new Date(event.end).getTime();
      const duration = endTime - startTime;
      const oneHourInMilliseconds = 3600000;
      console.log(duration);
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

  function handleCloseModal() {
    setSelectedEvent(null);
  }
  console.log(selectedEvent);
  async function handleConfirmReservation() {
    try {
      if (!selectedEvent) return;
      const startOfWeek = new Date(selectedEvent.start);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay() + 1);

      const endOfWeek = new Date(selectedEvent.end);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()) + 1);

      let horario: Partial<Horario> = {
        IdUser: user?.IdUser || 0,
        StartTime: `${formatHour(selectedEvent.start)}:00`,
        EndTime: `${formatHour(selectedEvent.end)}:00`,
        DateDay: formatDate(formattedDate),
        StartWeekend: formatDate2(startOfWeek),
        EndWeekend: formatDate2(endOfWeek),
      };
      console.log(horario);
      let response: { msg: string; success: boolean };
      if (user?.Rol === 1) {
        response = await crearHorarioCancha1(horario);
        console.log(response);
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
        console.log(response);
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
        throw new Error("Rol de usuario no válido");
      }
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
    } finally {
      handleCloseModal();
    }
  }

  function formatHour(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function formatDate(dateString: string) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = dateParts[1].padStart(2, "0");
    const day = dateParts[2].padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  function formatDate2(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
                <p>Área: {user?.Area}</p>
                <p>
                  Horario: {selectedEvent && formatHour(selectedEvent.start)} a{" "}
                  {selectedEvent && formatHour(selectedEvent.end)}
                </p>
                <p>
                  Día:{" "}
                  {selectedEvent &&
                    new Date(selectedEvent.start).toLocaleDateString()}
                </p>
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
    </div>
  );
}
