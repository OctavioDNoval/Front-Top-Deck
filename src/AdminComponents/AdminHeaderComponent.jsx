import { CircleUser } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthComponent } from "../Components/AuthComponent";

export const AdminHeaderComponent = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const location = useLocation();

	return (
		<header className="admin-header">
			<nav className="admin-navbar">
				<ul className="admin-navbar-list">
					<Link to="/" className={location.pathname === "/" ? "active" : ""}>
						Inicio
					</Link>
					<Link
						to="/productos"
						className={location.pathname === "/productos" ? "active" : ""}
					>
						Productos
					</Link>
					<Link
						to="/categoria"
						className={location.pathname === "/categoria" ? "active" : ""}
					>
						Categorias
					</Link>
					<Link
						to="/usuarios"
						className={location.pathname === "/usuarios" ? "active" : ""}
					>
						Usuarios
					</Link>
					<Link
						to="/logs"
						className={location.pathname === "/logs" ? "active" : ""}
					>
						Logs
					</Link>
					<Link
						to="/eventos"
						className={location.pathname === "/eventos" ? "active" : ""}
					>
						Eventos
					</Link>
					<button onClick={() => setIsProfileOpen(true)}>
						<CircleUser size={20} />
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
