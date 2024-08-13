import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface INavbarProps {
	fetchCocktailRandom: () => void;
}

export function Navbar({ fetchCocktailRandom }: INavbarProps): ReactElement {
	return (
		<header className="navbar">
			<Link to="/" className="link-home">Drink Showcase</Link>
			<div className="navbar-links">
				<Link to="/search" className="link-search">Search</Link>
				<button type="button" onClick={fetchCocktailRandom} className="button-random">Random Cocktail</button>
			</div>
		</header>
	);
}