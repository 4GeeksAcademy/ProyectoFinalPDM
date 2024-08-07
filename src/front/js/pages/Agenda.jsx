import React, { useState, useEffect, useContext } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Tooltip from 'react-tooltip-lite';
import "/workspaces/ProyectoFinalPDM/src/front/styles/agenda.css"
import { Context } from '../store/appContext';

const localizer = momentLocalizer(moment);



// const fetchEvents = async () => {
//   return [
//     {
//       title: 'Juan Pérez',
//       start: new Date('2024-08-05T09:00:00'),
//       end: new Date('2024-08-05T10:00:00'),
//       product: 'Crema Hidratante',
//       service: 'Masaje relajante',
//     },
//     {
//       title: 'Ana Gómez',
//       start: new Date('2024-08-06T14:00:00'),
//       end: new Date('2024-08-06T15:00:00'),
//       product: 'Suero Antiedad',
//       service: 'Tratamiento facial',
//     },
//     {
//       title: 'Maria Gómez',
//       start: new Date('2024-08-06T16:00:00'),
//       end: new Date('2024-08-06T18:00:00'),
//       product: 'Antiedad',
//       service: 'facial',
//     },
//     {
//       title: 'Maria Gómez',
//       start: new Date('2024-08-06T16:00:00'),
//       end: new Date('2024-08-06T18:00:00'),
//       product: 'Antiedad',
//       service: 'facial',
//     },
//     // Añade más eventos según sea necesario
//   ];
// };

export const Agenda = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState('week');
  const { store, actions } = useContext(Context);

  useEffect(() => {
    // const getEvents = async () => {
    //   const eventsFromServer = await fetchEvents();
    //   setEvents(eventsFromServer);
    // };
    // getEvents();
    actions.fetchAppointments();
  }, []);

  useEffect(() => {
    const formatEvents = store.appointments.map(e => {
      const {start,end} = generateDates(e.appointment_time)
      return {
          title: e.first_name_customer,
          start,
          end,
          product: e.product_id,
          service: e.service_id
        }
    })
    setEvents(formatEvents)
    console.log(formatEvents)
  }, [store.appointments]);

  function generateDates(isoDate) {
    const startDate = new Date(isoDate);
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
  
 
  
    return {
      start:startDate,
      end:endDate
    };
  }

  const handleViewChange = (newView) => {
    setView(newView);
  };

  const Event = ({ event }) => {
    return (
      <Tooltip
        content={
          <div>
            <strong>Cliente:</strong> {event.title}<br />
            <strong>Producto:</strong> {event.product}<br />
            <strong>Servicio:</strong> {event.service}
          </div>
        }
        direction="right"
        tagName="div"
        className="react-tooltip-lite"
      >
        <div className="rbc-event">
          <strong>{event.title}</strong> {/* Solo muestra el nombre del cliente */}
        </div>
      </Tooltip>
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
