import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./Pages/HomePage";
import { HeaderComponent } from "./Components/HeaderComponent";
import { FooterComponent } from "./Components/FooterComponent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ProductPage } from "./Pages/ProductPage";
import { ContactPage } from "./Pages/ContactPage";
import { CarritoPage } from "./Pages/CarritoPage";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StrictMode>
			<HeaderComponent />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/productos" element={<ProductPage />} />
				<Route path="/contacto" element={<ContactPage />} />
				<Route path="/carrito" element={<CarritoPage />} />
			</Routes>
			<FooterComponent />
		</StrictMode>
	</BrowserRouter>
);
