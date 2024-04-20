import React, { useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid"; // Importa el complemento de la vista de tiempo
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

export function HomePage() {
  useEffect(() => {
    document.addEventListener("DOMContentLoaded", function () {
      console.log("DOMContentLoaded event fired");
    });
  }, []);

  return (
    <div className="page-wrapper">
      <div className="page-content">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]} // Agrega el complemento de la vista de tiempo
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
                editable={true}
                selectable={true}
                slotMinTime="08:00:00"
                slotMaxTime="18:00:00" 
                contentHeight="auto" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
