import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./AuthProvider";
import { App } from "./App";
import { AdminApp } from "./AdminApp";

createRoot(document.getElementById("root")).render(
	<BrowserRouter>
		<StrictMode>
			<AuthProvider>
				<AdminApp />
				{/*
					<App />
					
					*/}
			</AuthProvider>
		</StrictMode>
	</BrowserRouter>
);
