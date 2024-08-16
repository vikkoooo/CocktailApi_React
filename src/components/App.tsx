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
	const fetchData = async (url: string): Promise<any> => {
		setIsLoading(true);
		try {
			const response = await fetch(url); // fetch the api endpoint
			const data = await response.json(); // parse to json
			return data; // data variable will now keep the response object
		}
		catch (error) {
			console.error("Error fetching the api, error: ", error);
			return null;
		}
		finally {
			setIsLoading(false);
		}
	};

	const fetchCocktailRandom = async (): Promise<void> => {
		const data: any = await fetchData("https://www.thecocktaildb.com/api/json/v1/1/random.php"); // random endpoint
		if (data != null) {
			setCocktail(data.drinks[0]); // we only get one cocktail back in drinks array
		}
	};

	const fetchCocktailById = async (idDrink: string): Promise<void> => {
		const data: any = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`) // specific id endpoint
		if (data != null) {
			setCocktail(data.drinks[0]); // we only get one cocktail back in drinks array
		}
	};

	const fetchCocktailSearch = async (query: string): Promise<void> => {
		const data: any = await fetchData(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`) // search api endpoint
		if (data != null) {
			setDrinks(data.drinks || []); // set drinks array
		}
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
