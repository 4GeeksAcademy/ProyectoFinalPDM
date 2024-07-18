import React, { useContext } from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";


export const Home = () => {
	return (
		<div className="text-center mt-5">
			<h1>Agenda Inteligente</h1>
			<p>
				<img src={rigoImageUrl} />
			</p>
		</div>
	);
};
