import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/message.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const Message = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="message-box">
            <h4 className="message-heading">¡Tu cita ha sido agendada correctamente!</h4>
            <p className="message-text">Espere a la confirmación de su cita que se le enviará por correo electrónico/SMS.</p>
            <div className="tick-icon">
              <FontAwesomeIcon icon={faCheckCircle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};