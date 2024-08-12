import { ReactElement, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ICocktail, ICocktailContext } from "../interfaces";

export function CocktailInfoPage(): ReactElement {
	const { cocktail, fetchCocktailById, } = useOutletContext<ICocktailContext>();
	const { idDrink } = useParams(); // get id from url https://www.dhiwise.com/post/passing-parameters-to-routes-react-development

	// load on render
	useEffect((): void => {
		if (idDrink) {
			fetchCocktailById(idDrink);
		}
	}, []);


	const readIngredientsAndMeasures = () => {
		if (cocktail === null) {
			return;
		}

		const fullIngredientsList = [];

		for (let i = 1; i <= 15; i++) {
			const currentIngredient: string = cocktail[`strIngredient${i}` as keyof ICocktail]; // bracket notation https://stackoverflow.com/a/69198602
			const currentMeasure: string = cocktail[`strMeasure${i}` as keyof ICocktail];

			if (currentIngredient != null && currentMeasure != null) {
				fullIngredientsList.push(
					{ ingredient: currentIngredient, measure: currentMeasure }
				);
			}
		}
		return fullIngredientsList;
	};

	return (
		<div className="cocktail-info-page">
			{cocktail && (
				<div className="cocktail-detail">
					<h1>{cocktail.strDrink}</h1>
					<img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
					<p>Category: {cocktail.strCategory}</p>
					{cocktail.strTags && <p>Tags: {cocktail.strTags}</p>}
					<p>Glass: {cocktail.strGlass}</p>
					<h2>Ingredients and Measurements</h2>
					<ul>
						{readIngredientsAndMeasures()!.map((item, index) =>
							<li key={index}>{item.ingredient} - {item.measure}</li>
						)}
					</ul>
					<p><strong>Instructions:</strong> {cocktail.strInstructions}</p>
				</div>
			)
			}
		</div>
	);
}