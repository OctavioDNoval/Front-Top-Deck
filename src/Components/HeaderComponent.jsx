import { CircleUser, ShoppingCart, Volleyball } from "lucide-react";
import { Link } from "react-router-dom";

export const HeaderComponent = () => {
	return (
		<header className="header">
			<div className="logo-container">
				<Volleyball />
			</div>
			<ul className="header-list">
				<Link to="/">Inicio</Link>
				<Link to="/productos">Productos</Link>
				<Link to="/contacto">Contacto</Link>
				<Link to="/carrito">
					<ShoppingCart color="white" />
				</Link>
				<Link to="/account">
					<CircleUser color="white" />
				</Link>
			</ul>
		</header>
	);
};
