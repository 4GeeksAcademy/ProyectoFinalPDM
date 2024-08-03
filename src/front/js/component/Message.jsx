import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import '/workspaces/ProyectoFinalPDM/src/front/styles/message.css';
export const Message = () => {
  return (
    <div className="message-container">
      <div className="message-box">
        <div className="tick-icon">
          <FontAwesomeIcon icon={faCheckCircle} size="3x" />
        </div>
        <h4 className="message-heading">¡Tu cita ha sido agendada correctamente!</h4>
        <p className="message-text">Espere a la confirmación de su cita que se le enviará por correo electrónico/SMS.</p>
      </div>
    </div>
  );
};
