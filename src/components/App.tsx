import { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { ICocktailContext } from "../interfaces";
import { Navbar } from "./Navbar";

export function App(): ReactElement {

	const cocktailContext: ICocktailContext = {

	};

	return (
		<div className="app">
			<Navbar />
			<main className="main-content">
				Hello from app
				<Outlet context={cocktailContext} />
			</main>
		</div >
	);
}
