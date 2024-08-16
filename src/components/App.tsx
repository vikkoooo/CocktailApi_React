import { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import { ICocktail, ICocktailContext } from "../interfaces";
import { Navbar } from "./Navbar";

export function App(): ReactElement {
	// states
	const [cocktail, setCocktail] = useState<ICocktail | null>(null);
	const [drinks, setDrinks] = useState<ICocktail[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// functions
	const fetchCocktailRandom = (): void => {
		setIsLoading(true);
		fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php") // fetch the random api endpoint
			.then(response => response.json()) // parse to json
			.then(data => { // data variable will now keep the response object
				setCocktail(data.drinks[0]); // we only get one cocktail back in drinks array
			})
			.catch(error => {
				console.error("Error fetching the api, error: ", error);
			});
		setIsLoading(false);
	};

	const fetchCocktailById = (idDrink: string): void => {
		setIsLoading(true);
		fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`) // fetch the specific id endpoint
			.then(response => response.json()) // parse to json
			.then(data => { // data variable will now keep the response object
				setCocktail(data.drinks[0]); // we only get one cocktail back in drinks array
			})
			.catch(error => {
				console.error("Error fetching the api, error: ", error);
			});
		setIsLoading(false);
	};

	const fetchCocktailSearch = (query: string): void => {
		setIsLoading(true);
		fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`) // fetch the search api endpoint
			.then(response => response.json())
			.then(data => {
				setDrinks(data.drinks || []); // set drinks array
			})
			.catch(error => {
				console.error("Error fetching the api, error: ", error);
			});
		setIsLoading(false);
	};

	// context
	const cocktailContext: ICocktailContext = {
		cocktail,
		drinks,
		fetchCocktailRandom,
		fetchCocktailById,
		fetchCocktailSearch,
		isLoading
	};

	return (
		<div className="app">
			<Navbar fetchCocktailRandom={fetchCocktailRandom} />
			<main className="main-content">
				<Outlet context={cocktailContext} />
			</main>
		</div >
	);
}
