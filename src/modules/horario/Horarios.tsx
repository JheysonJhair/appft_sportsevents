import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { EventData } from "../../types/Eventos";
import {
  obtenerHorarioCancha1,
  obtenerHorarioCancha2,
} from "../../services/Horario";

export function Horarios() {
  const [eventsCancha1, setEventsCancha1] = useState<EventData[]>([]);
  const [eventsCancha2, setEventsCancha2] = useState<EventData[]>([]);

  useEffect(() => {
    async function fetchEventsCancha1() {
      try {
        const horarioCancha1 = await obtenerHorarioCancha1();
        console.log(horarioCancha1)
        const initialEventsCancha1: EventData[] = horarioCancha1.map((event) => ({
          title: event.FirstName,
          area: event.Area,
          laboratorio: event.Laboratory,  
          start: `${event.DateDay.split("T")[0]}T${formatHour(event.StartTime)}`,
          end: `${event.DateDay.split("T")[0]}T${formatHour(event.EndTime)}`,
          color: "#44a7ea",
        }));
        setEventsCancha1(initialEventsCancha1);
      } catch (error) {
        console.error("Error al obtener el horario de la Cancha 1:", error);
      }
    }

    async function fetchEventsCancha2() {
      try {
        const horarioCancha2 = await obtenerHorarioCancha2();
        console.log(horarioCancha2)
        const initialEventsCancha2: EventData[] = horarioCancha2.map((event) => ({
          title: event.FirstName,
          area: event.Area,
          laboratorio: event.Laboratory,  
          start: `${event.DateDay.split("T")[0]}T${formatHour(event.StartTime)}`,
          end: `${event.DateDay.split("T")[0]}T${formatHour(event.EndTime)}`,
          color: "#fd3550",
        }));
        setEventsCancha2(initialEventsCancha2);
      } catch (error) {
        console.error("Error al obtener el horario de la Cancha 2:", error);
      }
    }

    fetchEventsCancha1();
    fetchEventsCancha2();
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
  function formatHour(dateTimeString: string) {
    const date = new Date(dateTimeString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }
  function renderCalendar(slotMinTime: any, slotMaxTime: any, eventsData: EventData[]) {
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
    </div>
  );
}
