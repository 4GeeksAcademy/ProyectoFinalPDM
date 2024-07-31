import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// import '/workspaces/ProyectoFinalPDM/src/front/styles/agenda.css'; 

const localizer = momentLocalizer(moment);

const citas = [
  {
    id: 0,
    title: 'Cliente 1',
    start: new Date(2024, 6, 1, 10, 0, 0),
    end: new Date(2024, 6, 1, 11, 0, 0),
    products: ['Producto 1'],
    services: ['Servicio 1'],
    employee: 'Empleado 1',
  },
  {
    id: 1,
    title: 'Cliente 2',
    start: new Date(2024, 6, 1, 11, 0, 0),
    end: new Date(2024, 6, 1, 12, 0, 0),
    products: ['Producto 2'],
    services: ['Servicio 2'],
    employee: 'Empleado 2',
  },
  {
    id: 3,
    title: 'Cliente 1',
    start: new Date(2024, 6, 1, 10, 0, 0),
    end: new Date(2024, 6, 1, 11, 0, 0),
    products: ['Producto 1'],
    services: ['Servicio 1'],
    employee: 'Empleado 1',
  },
  {
    id: 4,
    title: 'Cliente 2',
    start: new Date(2024, 6, 1, 11, 0, 0),
    end: new Date(2024, 6, 1, 12, 0, 0),
    products: ['Producto 2'],
    services: ['Servicio 2'],
    employee: 'Empleado 2',
  },
  {
    id: 5,
    title: 'Cliente 4',
    start: new Date(2024, 7, 1, 11, 0, 0),
    end: new Date(2024, 7, 1, 12, 0, 0),
    products: ['Producto 2'],
    services: ['Servicio 2'],
    employee: 'Empleado 2',
  },
];

export const Agenda = () => {
  const [view, setView] = useState('week');

  const handleViewChange = (newView) => {
    setView(newView);
  };


  const Event = ({ event }) => {
    return (
      <div className="rbc-event-content">
        <strong>{event.title}</strong>
        {view === 'day' && (
          <div>
            <strong>Empleado:</strong> {event.employee}&nbsp; &nbsp; 
            <strong>Producto:</strong> {event.products}&nbsp; &nbsp;
            <strong>Servicio:</strong> {event.services}&nbsp; &nbsp;
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="calendario-citas">
      <h2 className="centrar_texto">Calendario de Citas</h2>
      <div>
        <Calendar
          localizer={localizer}
          events={citas}
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

