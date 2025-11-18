import { HeaderComponent } from "./Components/HeaderComponent";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ProductPage } from "./Pages/ProductPage";
import { SelectedProductPage } from "./Pages/SelectedProductPage";
import { FooterComponent } from "./Components/FooterComponent";
import { EventosPage } from "./Pages/EventosPage";
import { CarritoEfimeroProvider } from "./CarritoEfimeroProvider";

export const UserApp = () => {
	return (
		<>
			<CarritoEfimeroProvider>
				<HeaderComponent />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/productos" element={<ProductPage />} />
					<Route path="/productos/tag/:id_tag" element={<ProductPage />} />
					<Route path="/eventos" element={<EventosPage />} />
					<Route path="/productos/:id" element={<SelectedProductPage />} />
				</Routes>
				<FooterComponent />
			</CarritoEfimeroProvider>
		</>
	);
};
