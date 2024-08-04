import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "/workspaces/ProyectoFinalPDM/src/front/styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [OpenIndex, setOpenIndex] = useState(null);

    const frequentQuestionsList = [
        { question: "¿Qué es una agenda inteligente?", answer: "Una agenda inteligente es una herramienta que te permite gestionar de manera eficiente tus reservas y servicios, facilitando la programación de citas online para tus clientes." },
        { question: "¿Por qué usar una agenda inteligente?", answer: "Usar una agenda inteligente mejora la organización de tu negocio, optimiza la programación de citas y proporciona una experiencia de usuario más fluida para tus clientes." },
        { question: "¿Cómo me ayuda la agenda inteligente en la gestión de reservas?", answer: "Te permite registrar tu empresa, agregar servicios y gestionar reservas online de forma fácil. También ofrece opciones para que tus clientes elijan el servicio que desean." },
        { question: "¿Es fácil de usar la agenda inteligente?", answer: "Sí, nuestra agenda inteligente está diseñada con una interfaz intuitiva que facilita su uso tanto para ti como para tus clientes." },
        { question: "¿Dónde puedo compartir mi enlace de reservas?", answer: "Puedes compartir tu enlace de reservas donde prefieras, como redes sociales, WhatsApp, correo electrónico, y más. Nuestra herramienta te proporciona múltiples opciones para llegar a tus clientes y brindarles un acceso conveniente a tus servicios." },
        { question: "¿Por qué debería aceptar reservas online?", answer: "Aceptar reservas online ofrece numerosos beneficios. Simplifica la gestión de citas, aumenta la visibilidad de tu negocio, atrae a nuevos clientes y mejora la retención de los existentes. Además, reduce las llamadas telefónicas y elimina los posibles errores de reserva, lo que ahorra tiempo y mejora la satisfacción del cliente." },
        { question: "¿Qué hacer si encuentro problemas técnicos?", answer: "Si encuentras problemas técnicos, nuestro equipo de soporte está disponible para asistirte. Puedes contactarnos a través del correo electrónico de soporte o el chat en vivo en nuestra página de ayuda." }
    ];

    const handleItemClick = (index) => {
        if (OpenIndex === index) {
            setOpenIndex(null);
        } else {
            setOpenIndex(index);
        }
    };

    return (
        <div className="container_home p-5">
            <div className="content-container">
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <div className="centered-content">
                            <h1 className="title1"><strong>Crea gratis tu Agenda Inteligente</strong></h1>
                            <p className="p1">
                                Descubre la mejor manera de gestionar tus citas y optimizar tu negocio
                                <br></br>
                                Nuestra plataforma te permite tener el control total de tus reservas de forma rápida y sencilla.
                                <br></br>
                                ¡Regístrate gratis y aprovecha todas nuestras funcionalidades!
                            </p>
                            <Link to="/Register">
                                <button className="button-landing"><strong>Regístrate Gratis</strong></button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-4">
                        <div className="centered-content">
                            <h1 className="title1"><strong>Reserva una Cita</strong></h1>
                            <p className="p1">
                                Explora nuestra plataforma para descubrir una amplia gama de empresas y servicios organizados por categorías.
                                <br></br>
                                Optimiza tu tiempo al buscar entre opciones relevantes para tus necesidades.
                                <br></br>
                                ¡Accede aquí a nuestras empresas registradas, donde puedes buscar, comparar y elegir la mejor opción para ti!
                            </p>
                            <Link to="/ClientView">
                                <button className="button-landing"><strong>Agendar Cita</strong></button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mt-4">
                        <h1><strong>Transforma tu Negocio con Nuestra Agenda Inteligente</strong></h1>
                        <p>
                            Descubre cómo puedes simplificar la gestión de tu empresa con nuestra aplicación. Registra tu negocio, personaliza tu página de reservas y permite que tus clientes programen citas de manera fácil y rápida.
                            Olvídate de las herramientas anticuadas y difíciles de usar, y da el salto hacia una solución moderna y eficiente.
                        </p>
                    </div>
                    <div className="col-md-6 mb-5 mt-4">
                        <img src="https://assets.setmore.com/website/v2/images/landing-pages/online-agenda-software/lady-checking-agenda.webp" className="img-fluid" alt="Smart Scheduling" />
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 mb-5 mt-3">
                        <img src="https://ecope.es/wp-content/uploads/2020/05/reservas-online-cita-previa-wordpress-1024x675.png" className="img-fluid" alt="Easy Setup" />
                    </div>
                    <div className="col-md-6 mt-3">
                        <h1><strong>Facilidad y Flexibilidad en la Gestión de Reservas</strong></h1>
                        <p>
                            Nuestra aplicación te permite agregar tus servicios para que tus clientes puedan hacer reservas online.
                            Ofrece una experiencia de usuario sin fricciones, gestionando todo el proceso de manera intuitiva.
                        </p>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-3 mb-5">
                        <div className="card1">
                            <div className="card-body text-center">
                                <i className="fas fa-calendar-check card-icon"></i>
                                <h5 className="card-title1">Organización Perfecta</h5>
                                <p className="card-text">Mantén un control total sobre tus citas y servicios con nuestra herramienta de gestión. Todo en un solo lugar.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-5">
                        <div className="card1">
                            <div className="card-body text-center">
                                <i className="fas fa-user-friends card-icon"></i>
                                <h5 className="card-title1">Interfaz Intuitiva</h5>
                                <p className="card-text">Disfruta de una interfaz fácil de usar que simplifica la programación de citas para ti y tus clientes.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-5">
                        <div className="card1">
                            <div className="card-body text-center">
                                <i className="fas fa-laptop-house card-icon"></i>
                                <h5 className="card-title1">Acceso en Línea</h5>
                                <p className="card-text">Tus clientes pueden hacer reservas online desde cualquier lugar, en cualquier momento.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-5">
                        <div className="card1">
                            <div className="card-body text-center">
                                <i className="fas fa-bell card-icon"></i>
                                <h5 className="card-title1">Notificaciones Automáticas</h5>
                                <p className="card-text">Recibe notificaciones automáticas de nuevas reservas y recordatorios de citas.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row mt-5">
                    <div className="col-md-6 mt-4">
                        <h1><strong>Optimiza la Gestión de tu Empresa</strong></h1>
                        <p>
                            Con nuestra aplicación, tendrás una visión clara y organizada de tus reservas, empleados y servicios.
                            Aumenta la eficiencia de tu negocio y ofrece un servicio de calidad superior a tus clientes con herramientas avanzadas de gestión.
                        </p>
                    </div>
                    <div className="col-md-6 mb-5 mt-4">
                        <img src="https://www.sesamehr.mx/wp-content/uploads/2023/06/base-datos-recursos-humanos-empresa.webp" className="img-fluid" alt="Business Management" />
                    </div>
                </div>
            </div>
            <div className="bottom">
                <div className="row mt-5 text-center">
                    <div className="col-md-12 mt-5 mb-5">
                        <div className="extra-information">
                            <h1>¿Cómo Funciona?</h1>
                            <p>
                                Nuestra aplicación está diseñada para simplificar la gestión de reservas. Registra tu empresa, añade tus servicios, y permite que tus clientes programen citas online sin complicaciones.
                                Con características intuitivas y fáciles de usar, podrás optimizar la gestión de tu negocio y brindar una experiencia excepcional a tus clientes.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row mt-5 text-center">
                    <div className="col-md-12 mb-5">
                        <div className="questions container_homeFq pb-5 pt-5">
                            <h1>Preguntas Frecuentes</h1>
                            {frequentQuestionsList.map((item, index) => (
                                <div key={index} className="fq-item">
                                    <div
                                        className={`fq-question ${OpenIndex === index ? 'active' : ''}`}
                                        onClick={() => handleItemClick(index)}
                                    >
                                        {item.question}
                                    </div>
                                    {OpenIndex === index && (
                                        <div className="fq-answer">
                                            <p>{item.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

