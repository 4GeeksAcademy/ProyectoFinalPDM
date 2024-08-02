import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/clientview.css";
import { Link } from "react-router-dom";

export const ClientView = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="company-categories container">
            <h1 className="text-center mb-4">Explora nuestras empresas registradas</h1>
            <div className="card card-company">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="companySelect">Selecciona una empresa</label>
                        <select id="companySelect" className="form-control">
                            <option value="">-- Selecciona --</option>
                            <option value="empresa1">Empresa 1</option>
                            <option value="empresa2">Empresa 2</option>
                            <option value="empresa3">Empresa 3</option>
                        </select>
                    </div>
                    <button className="button-company mt-3">
                        Buscar
                    </button>
                </div>
            </div>
            <div className="additional-cards mt-5">
                <div className="row">
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <i className="fas fa-search card-icon mb-3"></i>
                                <h5 className="card-title">Encuentra Empresas</h5>
                                <p className="card-text">Explora las empresas y encuentra la que mejor se ajuste a tus necesidades.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <i className="fas fa-calendar-alt card-icon mb-3"></i>
                                <h5 className="card-title">Agenda Citas</h5>
                                <p className="card-text">Programa tus citas con la empresa elegida de manera rápida y sencilla.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <i className="fas fa-cogs card-icon mb-3"></i>
                                <h5 className="card-title">Elige Servicios</h5>
                                <p className="card-text">Selecciona los servicios que necesitas para recibir atención personalizada.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
