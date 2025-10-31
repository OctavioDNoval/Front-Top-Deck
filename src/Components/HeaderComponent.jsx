import { CircleUser, ShoppingCart, Volleyball } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthComponent } from "./AuthComponent";

export const HeaderComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<header className="header">
			<div className="logo-container">
				<img
					src="../../img/LogoOnly2.webp"
					alt="topdek"
					className="header-logo"
				/>
			</div>
			<ul className="header-list">
				<Link to="/">Inicio</Link>
				<Link to="/productos">Productos</Link>
				<Link to="/contacto">Contacto</Link>
				<Link to="/carrito">
					<ShoppingCart />
				</Link>
				<button onClick={() => setIsModalOpen(true)}>
					<CircleUser color="white" />
				</button>
			</ul>

			<AuthComponent
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</header>
	);
};
