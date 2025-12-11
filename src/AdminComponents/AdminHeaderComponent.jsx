import { CircleUser, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthComponent } from "../Components/AuthComponent";
import { useMobile } from "../Hooks/useMobile";

export const AdminHeaderComponent = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const location = useLocation();
	const { isMobile } = useMobile();

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<header className={`admin-header ${isMobile ? "mobile" : ""}`}>
			<nav className="admin-navbar">
				{isMobile && (
					<button className="mobile-menu-toggle" onClick={toggleMenu}>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				)}

				<div className={`admin-navbar-content ${isMenuOpen ? "open" : ""}`}>
					<ul className="admin-navbar-list">
						<Link
							to="/"
							className={location.pathname === "/" ? "active" : ""}
							onClick={closeMenu}
						>
							Inicio
						</Link>
						<Link
							to="/productos"
							className={location.pathname === "/productos" ? "active" : ""}
							onClick={closeMenu}
						>
							Productos
						</Link>
						<Link
							to="/categoria"
							className={location.pathname === "/categoria" ? "active" : ""}
							onClick={closeMenu}
						>
							Categorias
						</Link>
						<Link
							to="/usuarios"
							className={location.pathname === "/usuarios" ? "active" : ""}
							onClick={closeMenu}
						>
							Usuarios
						</Link>
						<Link
							to="/logs"
							className={location.pathname === "/logs" ? "active" : ""}
							onClick={closeMenu}
						>
							Logs
						</Link>
						<Link
							to="/eventos"
							className={location.pathname === "/eventos" ? "active" : ""}
							onClick={closeMenu}
						>
							Eventos
						</Link>

						{isMobile ? (
							<button
								className="mobile-profile-btn"
								onClick={() => {
									setIsProfileOpen(true);
									closeMenu();
								}}
							>
								<CircleUser size={20} />
								<span>Perfil</span>
							</button>
						) : (
							<button
								className="desktop-profile-btn"
								onClick={() => setIsProfileOpen(true)}
							>
								<CircleUser size={20} />
							</button>
						)}
					</ul>
				</div>
			</nav>

			<AuthComponent
				isOpen={isProfileOpen}
				onClose={() => setIsProfileOpen(false)}
			/>
		</header>
	);
};
