import { HeaderComponent } from "./Components/HeaderComponent";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "./Pages/HomePage";
import { ProductPage } from "./Pages/ProductPage";
import { ContactPage } from "./Pages/ContactPage";
import { SelectedProductPage } from "./Pages/SelectedProductPage";
import { FooterComponent } from "./Components/FooterComponent";

export const UserApp = () => {
	return (
		<>
			<HeaderComponent />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/productos" element={<ProductPage />} />
				<Route path="/productos/tag/:id_tag" element={<ProductPage />} />
				<Route path="/contacto" element={<ContactPage />} />
				<Route path="/productos/:id" element={<SelectedProductPage />} />
			</Routes>
			<FooterComponent />
		</>
	);
};
