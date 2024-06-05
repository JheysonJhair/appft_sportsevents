import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import Swal from "sweetalert2";
import { EventData } from "../../types/Eventos";
import {
  obtenerHorarioCancha1,
  obtenerHorarioCancha2,
  eliminarHorarioCancha1,
  eliminarHorarioCancha2,
  crearHorarioCancha1,
  crearHorarioCancha2,
} from "../../services/Horario";

export function AdimistratorHome() {
  const [eventsCancha1, setEventsCancha1] = useState<EventData[]>([]);
  const [eventsCancha2, setEventsCancha2] = useState<EventData[]>([]);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<EventData>({
    title: "",
    area: "",
    laboratorio: "",
    start: "",
    end: "",
    color: "",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEventsCancha1();
      fetchEventsCancha2();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  async function fetchEventsCancha1() {
    try {
      const horarioCancha1 = await obtenerHorarioCancha1();
      const initialEventsCancha1: EventData[] = horarioCancha1.map((event) => ({
        title: event.FirstName,
        area: event.NameArea,
        laboratorio: event.NameManagement,
        start: `${event.DateDay}T${event.StartTime}`,
        end: `${event.DateDay}T${event.EndTime}`,
        color: "#44a7ea",
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
        color: "#ef8392",
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
                text: "Se ah eliminado correctamente!",
                icon: "success",
              });
            }
          } else if (fieldId2) {
            const response = await eliminarHorarioCancha2(fieldId2);
            if (response.success) {
              setEventsCancha2(
                eventsCancha2.filter((e) => e.IdField2Entity !== fieldId2)
              );
              Swal.fire({
                title: "¡Eliminado!",
                text: "Se ah eliminado correctamente!",
                icon: "success",
              });
            }
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

  function renderEventContent(eventInfo: any) {
    return (
      <div>
        <span
          className="delete-icon"
          onClick={() => handleDelete(eventInfo.event)}
          style={{ cursor: "pointer", marginRight: "8px" }}
        >
          ❌
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
          editable={true} // Allow drag and drop
          selectable={true} // Allow selecting slots
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

  function handleSelectEvent(event: any) {
    setIsEventModalOpen(true);
    setNewEvent({
      ...newEvent,
      start: event.startStr,
      end: event.endStr,
    });
  }

  async function handleConfirmReservation() {
    try {
      const canchaId = newEvent.color === "#44a7ea" ? 1 : 2; // Example: distinguish between Cancha 1 and 2 by color
      const horario = {
        IdUser: 1, // Dummy user ID for admin, update as necessary
        StartTime: `${formatHour(newEvent.start)}:00`,
        EndTime: `${formatHour(newEvent.end)}:00`,
        DateDay: formatDate(newEvent.start),
        ListPlayer: newEvent.title, // Assuming the title contains player list, update as necessary
      };

      let response;
      if (canchaId === 1) {
        response = await crearHorarioCancha1(horario);
      } else {
        response = await crearHorarioCancha2(horario);
      }

      if (response.success) {
        Swal.fire({
          title: `CANCHA ${canchaId}!`,
          text: "El horario se registró correctamente!",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
        setIsEventModalOpen(false);
        setNewEvent({
          title: "",
          area: "",
          laboratorio: "",
          start: "",
          end: "",
          color: "",
        });
        fetchEventsCancha1();
        fetchEventsCancha2();
      } else {
        Swal.fire({
          title: "Error!",
          text: response.msg,
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error al confirmar reserva:", error);
      Swal.fire({
        title: "Error!",
        text: "Ocurrió un error al confirmar la reserva.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }

  function formatHour(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Horario Cancha 1 (Exclusivos)</h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsCancha1)}
            {renderCalendar("18:00:00", "21:00:00", eventsCancha1)}
            <h5 className="card-title mt-3">Horario Cancha 2 (Trabajadores)</h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsCancha2)}
            {renderCalendar("18:00:00", "21:00:00", eventsCancha2)}
          </div>
        </div>
      </div>

      {isEventModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Añadir Evento</h2>
            <form>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Área</label>
                <input
                  type="text"
                  value={newEvent.area}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, area: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Laboratorio</label>
                <input
                  type="text"
                  value={newEvent.laboratorio}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, laboratorio: e.target.value })
                  }
                />
              </div>
              <div className="form-group">
                <label>Color</label>
                <input
                  type="color"
                  value={newEvent.color}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, color: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="btn btn-primary"
              >
                Confirmar
              </button>
              <button
                type="button"
                onClick={() => setIsEventModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
