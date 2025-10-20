import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./Pages/HomePage";
import { HeaderComponent } from "./Components/HeaderComponent";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<HeaderComponent />
		<HomePage />
	</StrictMode>
);
