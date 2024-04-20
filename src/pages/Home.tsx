import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

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
      color: "#3788d8",
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
