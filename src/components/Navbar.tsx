import { ReactElement } from "react";
import { Link } from "react-router-dom";

export function Navbar(): ReactElement {
	return (
		<header className="navbar">
			<ul className="links">
				<Link to="/" className="link">Home</Link>
				<Link to="/search" className="link">Search</Link>
			</ul>
		</header>
	);
}