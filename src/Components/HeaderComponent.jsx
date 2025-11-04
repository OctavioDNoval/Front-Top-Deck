import { CircleUser, ShoppingCart, Volleyball } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthComponent } from "./AuthComponent";
import { CarritoComponent } from "./CarritoComponent";

export const HeaderComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCarritoOpen, setIsCarritoOpen] = useState(false);

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
				<button onClick={() => setIsCarritoOpen(true)}>
					<ShoppingCart />
				</button>
				<button onClick={() => setIsModalOpen(true)}>
					<CircleUser color="white" />
				</button>
			</ul>

			<CarritoComponent
				isOpen={isCarritoOpen}
				onClose={() => setIsCarritoOpen(false)}
				authOpen={() => setIsModalOpen(true)}
			/>

			<AuthComponent
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</header>
	);
};
