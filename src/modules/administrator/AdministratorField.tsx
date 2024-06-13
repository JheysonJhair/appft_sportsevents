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
  obtenerHorarioCancha1PorId,
  obtenerHorarioCancha2PorId,
} from "../../services/Horario";

export function AdimistratorField() {
  const [eventsCancha1, setEventsCancha1] = useState<EventData[]>([]);
  const [eventsCancha2, setEventsCancha2] = useState<EventData[]>([]);
  const [eventDetails, setEventDetails] = useState<any>(null);
  const [ayuda, setAyuda] = useState<any>(false);

  //---------------------------------------------------------------- GET FIELD 1 AND 2
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

  //---------------------------------------------------------------- RENDER
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
          {truncateText(eventInfo.event.extendedProps.area, 18)}
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
            left: "prev,next today",
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
          dayCellClassNames="special-day-cell"
        />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-center">
              Horario Cancha 1 (Operaciones mina)
            </h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsCancha1)}
            {renderSpecialCalendar("09:00:00", "18:00:00", eventsCancha1)}
            {renderCalendar("18:00:00", "21:00:00", eventsCancha1)}
            <h5 className="card-title mt-3 text-center">
              Horario Cancha 2 (Trabajadores gerencia)
            </h5>
            <hr />
            {renderCalendar("06:00:00", "09:00:00", eventsCancha2)}
            {renderSpecialCalendar("09:00:00", "18:00:00", eventsCancha2)}
            {renderCalendar("18:00:00", "21:00:00", eventsCancha2)}
          </div>
        </div>
      </div>
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
    </div>
  );
}
