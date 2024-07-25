import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const Home = () => {
    const { store, actions } = useContext(Context);
    const [OpenIndex, setOpenIndex] = useState(null);

    const frequentQuestionsList = [
        { question: "¿Qué es una agenda inteligente?", answer: "Una agenda inteligente es una herramienta que te permite gestionar de manera eficiente tus reservas, servicios y empleados, facilitando la programación de citas online para tus clientes." },
        { question: "¿Por qué usar una agenda inteligente?", answer: "Usar una agenda inteligente mejora la organización de tu negocio, optimiza la programación de citas y proporciona una experiencia de usuario más fluida para tus clientes." },
        { question: "¿Cómo me ayuda la agenda inteligente en la gestión de reservas?", answer: "Te permite registrar tu empresa, agregar servicios y empleados, y gestionar reservas online de forma fácil. También ofrece opciones para que tus clientes elijan con qué empleado desean tratar." },
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6">
                    <h1>Transforma tu Negocio con Nuestra Agenda Inteligente</h1>
                    <p>
                        Descubre cómo puedes simplificar la gestión de tu empresa con nuestra aplicación. Registra tu negocio, personaliza tu página de reservas y permite que tus clientes programen citas de manera fácil y rápida. 
                        Olvídate de las herramientas anticuadas y difíciles de usar, y da el salto hacia una solución moderna y eficiente.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" className="img-fluid" alt="Smart Scheduling" />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" className="img-fluid" alt="Easy Setup" />
                </div>
                <div className="col-md-6">
                    <h1>Facilidad y Flexibilidad en la Gestión de Reservas</h1>
                    <p>
                        Nuestra aplicación te permite agregar tus servicios y empleados para que tus clientes puedan hacer reservas online. 
                        Ofrece una experiencia de usuario sin fricciones, donde pueden elegir el empleado con el que desean tratar, gestionando todo el proceso de manera intuitiva.
                    </p>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-3">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 1" />
                        <div className="card-body">
                            <h5 className="card-title">Organización Perfecta</h5>
                            <p className="card-text">Mantén un control total sobre tus citas y servicios con nuestra herramienta de gestión. Todo en un solo lugar.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 2" />
                        <div className="card-body">
                            <h5 className="card-title">Interfaz Intuitiva</h5>
                            <p className="card-text">Disfruta de una interfaz fácil de usar que simplifica la programación de citas para ti y tus clientes.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 3" />
                        <div className="card-body">
                            <h5 className="card-title">Selección de Empleados</h5>
                            <p className="card-text">Permite a tus clientes elegir con qué empleado desean ser atendidos, mejorando la experiencia de usuario.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <img src="https://via.placeholder.com/150" className="card-img-top" alt="Feature 4" />
                        <div className="card-body">
                            <h5 className="card-title">Acceso en Línea</h5>
                            <p className="card-text">Tus clientes pueden hacer reservas online desde cualquier lugar, en cualquier momento.</p>
                            <a href="#" className="btn btn-primary">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-6">
                    <h1>Optimiza la Gestión de tu Empresa</h1>
                    <p>
                        Con nuestra aplicación, tendrás una visión clara y organizada de tus reservas, empleados y servicios. 
                        Aumenta la eficiencia de tu negocio y ofrece un servicio de calidad superior a tus clientes con herramientas avanzadas de gestión.
                    </p>
                </div>
                <div className="col-md-6">
                    <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/non_2x/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" className="img-fluid" alt="Business Management" />
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="extra-information">
                        <h1>¿Cómo Funciona?</h1>
                        <p>
                            Nuestra aplicación está diseñada para simplificar la gestión de reservas. Registra tu empresa, añade tus servicios y empleados, y permite que tus clientes programen citas online sin complicaciones. 
                            Con características intuitivas y fáciles de usar, podrás optimizar la gestión de tu negocio y brindar una experiencia excepcional a tus clientes.
                        </p>
                    </div>
                </div>
            </div>
            <div className="row mt-5">
                <div className="col-md-12">
                    <div className="bottom">
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
    );
};
