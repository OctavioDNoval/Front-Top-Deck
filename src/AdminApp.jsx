import { Route, Routes } from "react-router-dom";
import { AdminHeaderComponent } from "./AdminComponents/AdminHeaderComponent";
import { ProductosAdminComponent } from "./AdminComponents/ProductosAdminComponent";
import { AdminCategoriaComponent } from "./AdminComponents/AdminCategoriaComponent";
import { AdminUsuariosComponent } from "./AdminComponents/AdminUsuariosComponent";
import { AdminWelcomePage } from "./AdminComponents/AdminWelcomePage";
import { AdminLogsComponent } from "./AdminComponents/AdminLogsComponent";

export const AdminApp = () => {
	return (
		<>
			<AdminHeaderComponent />
			<Routes>
				<Route path="/" element={<AdminWelcomePage />} />
				<Route path="/productos" element={<ProductosAdminComponent />} />
				<Route path="/categoria" element={<AdminCategoriaComponent />} />
				<Route path="/usuarios" element={<AdminUsuariosComponent />} />
				<Route path="/logs" element={<AdminLogsComponent />} />
			</Routes>
		</>
	);
};
