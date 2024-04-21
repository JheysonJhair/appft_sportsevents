import  { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { useAuth } from "../hooks/AuthContext";

interface EventData {
  title: string;
  area: string;
  laboratorio: string;
  start: string;
  end: string;
  color: string;
}

export function HomePage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [, setShowModal] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const data = [
      {
        horainicio: "06:00:00",
        horafin: "07:00:00",
        usuario: "Walter A. Serrano",
        area: "OPERACIONES MINA",
        laboratorio: "Anta Wasi",
        dia: "2024-04-17",
      },
      {
        horainicio: "07:00:00",
        horafin: "09:00:00",
        usuario: "Juan Perez",
        area: "OPERACIONES MINA",
        laboratorio: "Anta Wasi",
        dia: "2024-04-17",
      },
      {
        horainicio: "18:00:00",
        horafin: "19:00:00",
        usuario: "Maria Rodriguez",
        area: "OPERACIONES MINA",
        laboratorio: "Anta Wasi",
        dia: "2024-04-20",
      },
    ];

    const initialEvents: EventData[] = data.map((event) => ({
      title: event.usuario,
      area: event.area,
      laboratorio: event.laboratorio,
      start: `${event.dia}T${event.horainicio}`,
      end: `${event.dia}T${event.horafin}`,
      color: "#44a7ea",
    }));

    setEvents(initialEvents);
  }, []);

  function renderEventContent(eventInfo: {
    event: {
      title: string;
      extendedProps: { area: string; laboratorio: string };
    };
  }) {
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
    setSelectedEvent(event);
    console.log(selectedEvent);
    setShowModal(true);
  }

  function handleCloseModal() {
    setSelectedEvent(null);
    setShowModal(false);
  }
  function formatHour(dateTimeString: any) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes}${ampm}`;
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
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
                <p>Área: {user?.LastName}</p>
                <p>
                  Horario: {selectedEvent && formatHour(selectedEvent.start)} a{" "}
                  {selectedEvent && formatHour(selectedEvent.end)}
                </p>
              </div>
              <div className="modal-footer">
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
