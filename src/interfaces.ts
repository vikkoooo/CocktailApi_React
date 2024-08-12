export interface ICocktailContext {
	cocktail: ICocktail | null;
	fetchRandomCocktail: () => void;
}

export interface ICocktail {
	idDrink: string;
	strDrink: string;
	strDrinkThumb: string;
	strInstructions: string;
}