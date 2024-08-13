import { ReactElement, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { ICocktailContext } from "../interfaces";

export function HomePage(): ReactElement {
	// import context
	const { cocktail, fetchCocktailRandom } = useOutletContext<ICocktailContext>();

	// fetch a random cocktail when HomePage is rendered
	useEffect((): void => {
		fetchCocktailRandom();
	}, []);

	return (
		<div className="home-page">
			{cocktail && (
				<div className="cocktail-card">
					<h1>{cocktail.strDrink}</h1>
					<img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
					<Link to={`/info/${cocktail.idDrink}`} className="link">See more</Link>
				</div>
			)}
			<button type="button" onClick={fetchCocktailRandom}>Reload random cocktail</button>
		</div>
	);
}