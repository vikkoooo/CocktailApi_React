import { FormEvent, ReactElement, useState } from "react";
import { ICocktailContext } from "../interfaces";
import { useOutletContext } from "react-router-dom";

export function SearchPage(): ReactElement {
	const { drinks, fetchCocktailSearch, } = useOutletContext<ICocktailContext>();
	const [searchInput, setSearchInput] = useState("");

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetchCocktailSearch(searchInput);
		setSearchInput("");
	}

	return (
		<div className="search-page">
			<form className="search-form" onSubmit={handleSubmit}>
				<input type="text" className="search-input" placeholder="Search.." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
				<button type="submit" className="search-button">Search</button>
			</form>
			<ul>
				{drinks && drinks.map(drink => (
					<li key={drink.idDrink}>
						{drink.strDrink}
					</li>
				))}
			</ul>
		</div>
	);
}