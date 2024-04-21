import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { EventData } from "../../types/Eventos";

export function Horarios() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [eventsW, setEventsW] = useState<EventData[]>([]);

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

    const initialEventsWork: EventData[] = data.map((event) => ({
      title: event.usuario,
      area: event.area,
      laboratorio: event.laboratorio,
      start: `${event.dia}T${event.horainicio}`,
      end: `${event.dia}T${event.horafin}`,
      color: "#fd3550",
    }));

    setEvents(initialEvents);
    setEventsW(initialEventsWork);
  }, []);

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

  function renderCalendar(slotMinTime: any, slotMaxTime: any, eventsData: any) {
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
        />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">EXCLUSIVOS</h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", events)}
            {renderCalendar("18:00:00", "21:00:00", events)}
            <h5 className="card-title mt-3">TRABAJADORES</h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsW)}
            {renderCalendar("18:00:00", "21:00:00", eventsW)}
          </div>
        </div>
      </div>
    </div>
  );
}
