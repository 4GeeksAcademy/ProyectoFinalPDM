import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container d-flex justify-content-end">
				<div>
					<Link to={"/Login"}>
						<button> login </button>
					</Link>
					<Link to={"/Register"}>
						<button> register </button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
