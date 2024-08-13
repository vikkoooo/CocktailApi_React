import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function Navbar(): ReactElement {
	return (
		<header className="navbar">
			<Link to="/" className="link-home">Drink Showcase</Link>
			<span className="spacer" />
			<Link to="/search" className="link-search">Search</Link>
			<button type="button" onClick={() => console.log("button-random clicked")} className="button-random">Random Cocktail</button>
		</header>
	);
}