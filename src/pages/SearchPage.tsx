import { FormEvent, ReactElement, useEffect, useState } from "react";
import { ICocktail, ICocktailContext } from "../interfaces";
import { useNavigate, useOutletContext } from "react-router-dom";

export function SearchPage(): ReactElement {
	const { drinks, fetchCocktailSearch, isLoading } = useOutletContext<ICocktailContext>();
	const [searchInput, setSearchInput] = useState("");
	const [page, setPage] = useState(0);
	const [currentPageDrinks, setCurrentPageDrinks] = useState<ICocktail[]>([]);
	const drinksPerPage: number = 10;
	const navigate = useNavigate(); // react navigate functionallity for manual navigation

	useEffect(() => {
		updateCurrentPageDrinks();
	}, [drinks, page]); // render when drinks or page is updated

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetchCocktailSearch(searchInput);
		setSearchInput("");
		setPage(0);
	}

	const handleCocktailClick = (idDrink: string) => {
		navigate(`/info/${idDrink}`);
	}

	const updateCurrentPageDrinks = (): void => {
		if (drinks != null) {
			const startIndex = page * drinksPerPage; // will return 0 first time
			const endIndex = startIndex + drinksPerPage; // will return 10 first time
			setCurrentPageDrinks(drinks.slice(startIndex, endIndex)); // end exclusive so we get index 0 - 9 first time
		}
	};

	const navBack = (): void => {
		if (page >= 1) {
			setPage(page - 1);
		}
	};

	const navForward = (): void => {
		if (page < Math.ceil(drinks!.length / drinksPerPage) - 1) {
			setPage(page + 1);
		}
	};

	return (
		<div className="search-page">
			<h1>Search Drinks</h1>
			{isLoading ? (
				<span className="loader" />
			) : (
				<>
					<form className="search-form" onSubmit={handleSubmit}>
						<input type="text" className="search-input" placeholder=" 🔎︎  Search for a drink..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
						<button type="submit" className="search-button">Search</button>
					</form>
					<ul>
						{drinks && currentPageDrinks.map(drink => (
							<li key={drink.idDrink} onClick={() => handleCocktailClick(drink.idDrink)}>
								<img src={drink.strDrinkThumb} />
								<p>{drink.strDrink}</p>
								<span>See More</span>
							</li>
						))}
					</ul>
					<div className="search-buttons">
						<button type="button" onClick={navBack} disabled={page <= 0}>Prev Page</button>
						<button type="button" onClick={navForward} disabled={!drinks || page >= Math.ceil(drinks.length / drinksPerPage) - 1}>Next Page</button>
					</div>
				</>
			)}
		</div>
	);
}