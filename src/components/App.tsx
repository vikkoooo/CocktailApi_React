import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import { ICocktail, ICocktailContext } from "../interfaces";
import { Navbar } from "./Navbar";

export function App(): ReactElement {
	// states
	const [cocktail, setCocktail] = useState<ICocktail | null>(null);

	// functions
	const fetchRandomCocktail = (): void => {
		fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php") // fetch the random api endpoint
			.then(response => response.json()) // parse to json
			.then(data => { // data variable will now keep the response object
				setCocktail(data.drinks[0]); // we only get one cocktail back in drinks array
			})
			.catch(error => {
				console.error("Error fetching the api, error: ", error);
			});
	};

	const fetchCocktailById = (idDrink: string): void => {
		fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`) // fetch the specific id endpoint
			.then(response => response.json()) // parse to json
			.then(data => { // data variable will now keep the response object
				setCocktail(data.drinks[0]); // we only get one cocktail back in drinks array
			})
			.catch(error => {
				console.error("Error fetching the api, error: ", error);
			});
	};

	// context
	const cocktailContext: ICocktailContext = {
		cocktail,
		fetchRandomCocktail,
		fetchCocktailById
	};

	return (
		<div className="app">
			<Navbar />
			<main className="main-content">
				<Outlet context={cocktailContext} />
			</main>
		</div >
	);
}
