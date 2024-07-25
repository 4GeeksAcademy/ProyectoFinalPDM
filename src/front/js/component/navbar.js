import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<h1>Agenda Inteligente</h1>
			<div className="container d-flex justify-content-end">
				<div>
					<Link to={"/Login"}>
						<button className="ms-3 me-3"> login </button>
					</Link>
					<Link to={"/Register"}>
						<button> register </button>
					</Link>
					<Link to={"/RegisterDate"}>
						<		button> RegisterDate </button>
					</Link>
					<Link to={"/DateSelect"}>
						<		button> DateSelect </button>
					</Link>
					<Link to={"/CreateService"}>
						<button className="ms-3 me-3"> CreateService </button>
					</Link>
					<Link to={"/"}>
						<button className="ms-3 me-3"> Home </button>
					</Link>
					<Link to={"/Message"}>
						<button className="ms-3 me-3"> Message </button>
					</Link>

				</div>
			</div>
		</nav >
	);
};
