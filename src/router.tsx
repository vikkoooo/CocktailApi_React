import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "./components/App";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { CocktailInfoPage } from "./pages/CocktailInfoPage";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={< App />}>
			<Route index element={< HomePage />} />
			<Route path="search" element={< SearchPage />} />
			<Route path="info" element={< CocktailInfoPage />} />
		</Route>
	)
);