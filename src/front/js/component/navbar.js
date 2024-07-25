import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end">
				<div>
					<Link to={"/Login"}>
						<button className="ms-3 me-3"> login </button>
					</Link>
					<Link to={"/Register"}>
						<button className="ms-3 me-3"> register </button>
					</Link>
					<Link to={"/"}>
						<button className="ms-3 me-3"> Home </button>
					</Link>
					<Link to={"/PerfilUsuario"}>
						<button> Perfil Usuario</button>
					</Link>
					<Link to={"/AgendarCita"}>
						<button className="ms-3 me-3"> Agendar Cita</button>
					</Link>
					<Link to={"/Agenda"}>
						<button className="ms-3 me-3"> Agenda</button>
					</Link>

				</div>
			</div>
		</nav>
	);
};
