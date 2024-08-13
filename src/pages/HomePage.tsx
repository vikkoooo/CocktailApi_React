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
					<div className="info">
						<h1>Featured Drink</h1>
						<h2>{cocktail.strDrink}</h2>
						<Link to={`/info/${cocktail.idDrink}`} className="link">See More</Link>
					</div>
					<img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
				</div>
			)}
		</div>
	);
}