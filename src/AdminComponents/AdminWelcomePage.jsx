import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export const AdminWelcomePage = () => {
	const { user } = useContext(AuthContext);

	return (
		<main className="admin-main-page">
			<h2 className="admin-welcome-msg">Bienvenido, {user.nombre}!</h2>
			<img src="../img/admin/ashPikachu.webp" alt="Ash" className="img1" />
			<img
				src="../img/admin/105775-charizard-download-free-image.webp"
				alt="Chariuzard"
				className="img2"
			/>
		</main>
	);
};
