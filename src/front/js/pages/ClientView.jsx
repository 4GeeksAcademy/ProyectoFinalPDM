import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import "../../styles/clientview.css";
import { Link } from "react-router-dom";

export const ClientView = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getCompanies();
    }, []);
console.log({store})
    return (
        <div className="container_home">
            <h1 className="text-center mb-5">Explora nuestras empresas registradas</h1>
            <div className="card card-company">
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="companySelect">Selecciona una empresa</label>
                        <select id="companySelect" className="form-control">
                             {store.listCompany.map((empresa) => (
                                <option  value={empresa.name} key={empresa.id}>
                                    {empresa.name} - {empresa.nif}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button className="button-company mt-3">
                            Buscar
                        </button>
                    </div>
                </div>
            </div>
            <div className="additional-cards mt-5">
                <div className="row">
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <i className="fas fa-search card-icon mb-3"></i>
                                <h5 className="card-title1">Encuentra Empresas</h5>
                                <p className="card-text">Explora las empresas y encuentra la que mejor se ajuste a tus necesidades.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <i className="fas fa-calendar-alt card-icon mb-3"></i>
                                <h5 className="card-title1">Agenda Citas</h5>
                                <p className="card-text">Programa tus citas con la empresa elegida de manera rápida y sencilla.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <div className="card text-center">
                            <div className="card-body">
                                <i className="fas fa-cogs card-icon mb-3"></i>
                                <h5 className="card-title1">Elige Servicios</h5>
                                <p className="card-text">Selecciona los servicios que necesitas para recibir atención personalizada.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
