import { FormEvent, ReactElement, useState } from "react";
import { ICocktailContext } from "../interfaces";
import { useNavigate, useOutletContext } from "react-router-dom";

export function SearchPage(): ReactElement {
	const { drinks, fetchCocktailSearch, } = useOutletContext<ICocktailContext>();
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate(); // react navigate functionallity for manual navigation


	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		fetchCocktailSearch(searchInput);
		setSearchInput("");
	}

	const handleCocktailClick = (idDrink: string) => {
		console.log(idDrink);
		navigate(`/info/${idDrink}`);
	}

	return (
		<div className="search-page">
			<form className="search-form" onSubmit={handleSubmit}>
				<input type="text" className="search-input" placeholder="Search.." value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
				<button type="submit" className="search-button">Search</button>
			</form>
			<ul>
				{drinks && drinks.map(drink => (
					<li key={drink.idDrink} onClick={() => handleCocktailClick(drink.idDrink)}>
						{drink.strDrink}
					</li>
				))}
			</ul>
		</div>
	);
}