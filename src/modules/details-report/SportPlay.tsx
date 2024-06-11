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

export function SportPlay() {
  const [eventsCancha1, setEventsCancha1] = useState<EventData[]>([]);
  const [eventsCancha2, setEventsCancha2] = useState<EventData[]>([]);
  const [currentEventsCancha1, setCurrentEventsCancha1] = useState<EventData[]>(
    []
  );
  const [currentEventsCancha2, setCurrentEventsCancha2] = useState<EventData[]>(
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchEventsCancha1();
      fetchEventsCancha2();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const now = new Date();
    const currentEvents1 = eventsCancha1.filter(
      (event) => new Date(event.start) <= now && new Date(event.end) >= now
    );
    const currentEvents2 = eventsCancha2.filter(
      (event) => new Date(event.start) <= now && new Date(event.end) >= now
    );
    setCurrentEventsCancha1(currentEvents1);
    setCurrentEventsCancha2(currentEvents2);
  }, [eventsCancha1, eventsCancha2]);

  async function fetchEventsCancha1() {
    try {
      const horarioCancha1 = await obtenerHorarioCancha1();
      const initialEventsCancha1: EventData[] = horarioCancha1.map((event) => {
        const startTime = new Date(`${event.DateDay}T${event.StartTime}`);
        const color =
          startTime.getHours() >= 9 && startTime.getHours() < 13
            ? "#2C3E50"
            : event.areaIdArea === 1
            ? "#2C3E50"
            : "#44a7ea";
        return {
          title: event.FirstName,
          area: event.NameArea,
          laboratorio: event.NameManagement,
          jugadores: event.ListPlayer,
          start: `${event.DateDay}T${event.StartTime}`,
          end: `${event.DateDay}T${event.EndTime}`,
          turno: event.Shift,
          color: color,
          IdField1Entity: event.IdField1Entity,
        };
      });

      setEventsCancha1(initialEventsCancha1);
    } catch (error) {
      console.error("Error al obtener el horario de la Cancha 1:", error);
    }
  }

  async function fetchEventsCancha2() {
    try {
      const horarioCancha2 = await obtenerHorarioCancha2();
      const initialEventsCancha2: EventData[] = horarioCancha2.map((event) => {
        const startTime = new Date(`${event.DateDay}T${event.StartTime}`);
        const color =
          startTime.getHours() >= 9 && startTime.getHours() < 18
            ? "#2C3E50"
            : event.areaIdArea === 1
            ? "#2C3E50"
            : "#ed6173";
        return {
          title: event.FirstName,
          area: event.NameArea,
          laboratorio: event.NameManagement,
          jugadores: event.ListPlayer,
          start: `${event.DateDay}T${event.StartTime}`,
          end: `${event.DateDay}T${event.EndTime}`,
          turno: event.Shift,
          color: color,
          IdField2Entity: event.IdField2Entity,
        };
      });

      setEventsCancha2(initialEventsCancha2);
    } catch (error) {
      console.error("Error al obtener el horario de la Cancha 2:", error);
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
            left: "",
            center: "",
            right: "",
          }}
          initialView="timeGridDay"
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
  function renderSpecialCalendar(
    slotMinTime: any,
    slotMaxTime: any,
    eventsData: EventData[]
  ) {
    return (
      <div className="table-responsive py-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          locales={[esLocale]}
          locale="es"
          headerToolbar={{
            left: "",
            center: "",
            right: "",
          }}
          initialView="timeGridDay"
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
          <div className="card-body d-flex justify-content-between">
            <div className="calendar-column px-4">
              <h5 className="card-title">OPERACIONES MINA (Cancha 1)</h5>
              <hr />
              {renderCalendar("06:00:00", "09:00:00", eventsCancha1)}
              {renderSpecialCalendar("09:00:00", "18:00:00", eventsCancha1)}
              {renderCalendar("18:00:00", "21:00:00", eventsCancha1)}
            </div>
            <div className="calendar-column px-4">
              <h5 className="card-title">TRABAJADORES GERENCIAS (Cancha 2)</h5>
              <hr />
              {renderCalendar("06:00:00", "09:00:00", eventsCancha2)}
              {renderSpecialCalendar("09:00:00", "18:00:00", eventsCancha2)}
              {renderCalendar("18:00:00", "21:00:00", eventsCancha2)}
            </div>
          </div>
        </div>
        {currentEventsCancha1.length > 0 && (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Horario acual (Cancha 1)</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Título</th>
                      <th scope="col">Área</th>
                      <th scope="col">Gerencia</th>
                      <th scope="col">Inicio</th>
                      <th scope="col">Fin</th>
                      <th scope="col">Jugadores</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEventsCancha1.map((event, index) => (
                      <tr key={index}>
                        <td>{event.title}</td>
                        <td>{event.area}</td>
                        <td>{event.laboratorio}</td>
                        <td>{new Date(event.start).toLocaleString()}</td>
                        <td>{new Date(event.end).toLocaleString()}</td>
                        <td>{event.jugadores}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
        {currentEventsCancha2.length > 0 && (
          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Horario acual (Cancha 2)</h5>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">Título</th>
                      <th scope="col">Área</th>
                      <th scope="col">Gerencia</th>
                      <th scope="col">Inicio</th>
                      <th scope="col">Fin</th>
                      <th scope="col">Jugadores</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEventsCancha2.map((event, index) => (
                      <tr key={index}>
                        <td>{event.title}</td>
                        <td>{event.area}</td>
                        <td>{event.laboratorio}</td>
                        <td>{new Date(event.start).toLocaleString()}</td>
                        <td>{new Date(event.end).toLocaleString()}</td>
                        <td>{event.jugadores}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
