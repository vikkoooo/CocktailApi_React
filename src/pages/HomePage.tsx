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
			<h1>Featured Drink</h1>
			{cocktail && (
				<div className="cocktail-card">
					<img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
					<h2>{cocktail.strDrink}</h2>
					<Link to={`/info/${cocktail.idDrink}`} className="link">See More</Link>
				</div>
			)}
			<button type="button" onClick={fetchCocktailRandom}>Reload random cocktail</button>
		</div>
	);
}