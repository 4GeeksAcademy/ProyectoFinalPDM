import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const fetchEvents = async () => {
  const response = await fetch('/path-to-your-backend-endpoint'); // Update with actual endpoint
  const data = await response.json();
  return data;
};

export const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week');

  useEffect(() => {
    const getEvents = async () => {
      const eventsFromServer = await fetchEvents();
      setEvents(eventsFromServer);
    };
    getEvents();
  }, []);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const Event = ({ event }) => {
    return (
      <div className="rbc-event-content">
        <strong>{event.summary}</strong>
      </div>
    );
  };

  return (
    <div className="calendario-citas">
      <h2 className="centrar_texto">Calendario de Citas</h2>
      <div>
        <Calendar
          localizer={localizer}
          events={events}
          style={{ height: '100%' }}
          messages={{
            next: "Sig",
            previous: "Ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día",
          }}
          views={['week', 'day']}
          defaultView="week"
          components={{
            event: Event
          }}
          onView={handleViewChange}
        />
      </div>
    </div>
  );
};
