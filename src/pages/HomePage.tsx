import { ReactElement, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { ICocktailContext } from "../interfaces";

export function HomePage(): ReactElement {
	// import context
	const { cocktail, fetchRandomCocktail } = useOutletContext<ICocktailContext>();

	// fetch a random cocktail when HomePage is rendered
	useEffect(() => {
		fetchRandomCocktail();
	}, []);

	return (
		<div className="home-page">
			<h1>hello from home</h1>
			{cocktail && (
				<div className="cocktail">
					<h2>{cocktail.strDrink}</h2>
					<img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
					<p>{cocktail.strInstructions}</p>
				</div>
			)}
		</div>
	);
}