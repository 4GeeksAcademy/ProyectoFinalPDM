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
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { CreateService } from "/workspaces/ProyectoFinalPDM/src/front/js/pages/CreateService.jsx";
import { PerfilUsuario } from "/workspaces/ProyectoFinalPDM/src/front/js/pages/PerfilUsuario.jsx";
import { SucursalForm } from "./component/perfilUsuario/SucursalForm.jsx";
import { ProductForm } from "./component/perfilUsuario/ProductForm.jsx";w
import { EmpleadoForm } from "./component/perfilUsuario/EmpleadoForm.jsx";
import { EmpresaForm } from "./component/perfilUsuario/EmpresaForm.jsx";
import { AgendarCita } from "./pages/AgendarCita.jsx";
import Agenda from "./pages/Agenda.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Login />} path="/Login" />
                        <Route element={<Register />} path="/Register" />
                        <Route element={<CreateService />} path="/CreateService" />
                        <Route element={<PerfilUsuario />} path="/PerfilUsuario" />
                        <Route element={<SucursalForm />}  path="/CrearSucursal"  />
                        <Route  element={<EmpleadoForm />} path="/CrearEmpleado" />
                        <Route element={<EmpresaForm />} path="/CrearEmpresa"  />
                        <Route element={<AgendarCita />} path="/AgendarCita"  />
                        <Route element={<Agenda />} path="/Agenda"  />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
