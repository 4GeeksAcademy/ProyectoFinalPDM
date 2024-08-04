import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Login from "/workspaces/ProyectoFinalPDM/src/front/js/pages/Login.jsx";
import Register from "/workspaces/ProyectoFinalPDM/src/front/js/pages/Register.jsx";
import { RegisterDate } from "./component/RegisterDate.jsx";
import { Message } from "./component/Message.jsx";
import {AgregarServicio} from "/workspaces/ProyectoFinalPDM/src/front/js/component/AgregarServicio.jsx"
import {AgregarProducto} from "/workspaces/ProyectoFinalPDM/src/front/js/component/AgregarProducto.jsx"
import {PerfilUsuario} from "/workspaces/ProyectoFinalPDM/src/front/js/pages/PerfilUsuario.jsx"
import {SucursalForm} from "/workspaces/ProyectoFinalPDM/src/front/js/component/SucursalForm.jsx"
import {EmpleadoForm} from "/workspaces/ProyectoFinalPDM/src/front/js/component/EmpleadoForm.jsx"
import { EmpresaForm } from "/workspaces/ProyectoFinalPDM/src/front/js/component/EmpresaForm.jsx";
import {AgendarCita} from "/workspaces/ProyectoFinalPDM/src/front/js/pages/AgendarCita.jsx"
import {Agenda} from "/workspaces/ProyectoFinalPDM/src/front/js/pages/Agenda.jsx"
import { ClientView } from "./pages/ClientView.jsx";
//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<RegisterDate />} path="/RegisterDate" />
                        <Route element={<Message />} path="/Message" />
                        <Route element={<Home />} path="/" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login />} path="/Login" />
                        <Route element={<Register />} path="/Register" />
                        <Route element={<AgregarServicio />} path="/AgregarServicio" />
                        <Route element={<AgregarProducto />} path="/AgregarProducto" />
                        <Route element={<PerfilUsuario />} path="/PerfilUsuario" />
                        <Route element={<SucursalForm />}  path="/CrearSucursal"  />
                        <Route  element={<EmpleadoForm />} path="/CrearEmpleado" />
                        <Route element={<EmpresaForm />} path="/CrearEmpresa"  />
                        <Route element={<AgendarCita />} path="/AgendarCita"  />
                        <Route element={<Agenda />} path="/Agenda"  />
                        <Route element={<ClientView />} path="/ClientView" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);

