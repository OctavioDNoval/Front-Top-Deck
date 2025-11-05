import { CircleUser } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthComponent } from "../Components/AuthComponent";

export const AdminHeaderComponent = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);

	return (
		<header className="admin-header">
			<nav className="admin-navbar">
				<ul className="admin-navbar-list">
					<Link to="/">Inicio</Link>
					<Link to="/productos">Productos</Link>
					<Link to="/categoria">Categorias</Link>
					<Link to="/usuarios">Usuarios</Link>
					<button onClick={() => setIsProfileOpen(true)}>
						<CircleUser />
					</button>
				</ul>
			</nav>

			<AuthComponent
				isOpen={isProfileOpen}
				onClose={() => setIsProfileOpen(false)}
			/>
		</header>
	);
};
