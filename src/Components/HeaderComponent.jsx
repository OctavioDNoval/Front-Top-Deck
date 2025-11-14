import { CircleUser, ShoppingCart, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthComponent } from "./AuthComponent";
import { CarritoComponent } from "./CarritoComponent";

export const HeaderComponent = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isCarritoOpen, setIsCarritoOpen] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();

	// Efecto para detectar scroll
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Cerrar mobile menu al cambiar ruta
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [location]);

	return (
		<>
			<header className={`header ${scrolled ? "scrolled" : ""}`}>
				<div className="header-content">
					{/* Logo */}
					<Link to="/" className="logo-link">
						<div className="logo-container">
							<img
								src="../../img/LogoOnly2.webp"
								alt="TopDeck Importados"
								className="header-logo"
							/>
						</div>
					</Link>

					{/* Navegación Desktop */}
					<nav className="header-nav">
						<Link
							to="/"
							className={`nav-link ${
								location.pathname === "/" ? "active" : ""
							}`}
						>
							Inicio
						</Link>
						<Link
							to="/productos"
							className={`nav-link ${
								location.pathname === "/productos" ? "active" : ""
							}`}
						>
							Productos
						</Link>
						<Link
							to="/contacto"
							className={`nav-link ${
								location.pathname === "/contacto" ? "active" : ""
							}`}
						>
							Contacto
						</Link>
					</nav>

					{/* Acciones */}
					<div className="header-actions">
						<button
							className="action-btn cart-btn"
							onClick={() => setIsCarritoOpen(true)}
							aria-label="Carrito de compras"
						>
							<ShoppingCart size={20} />
							{/* Podrías añadir un badge aquí para la cantidad de items */}
							{/* <span className="cart-badge">3</span> */}
						</button>

						<button
							className="action-btn user-btn"
							onClick={() => setIsModalOpen(true)}
							aria-label="Cuenta de usuario"
						>
							<CircleUser size={20} />
						</button>

						{/* Mobile Menu Button */}
						<button
							className="mobile-menu-btn"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							aria-label="Menú de navegación"
						>
							{isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
					<nav className="mobile-nav">
						<Link
							to="/"
							className={`mobile-nav-link ${
								location.pathname === "/" ? "active" : ""
							}`}
						>
							Inicio
						</Link>
						<Link
							to="/productos"
							className={`mobile-nav-link ${
								location.pathname === "/productos" ? "active" : ""
							}`}
						>
							Productos
						</Link>
						<Link
							to="/contacto"
							className={`mobile-nav-link ${
								location.pathname === "/contacto" ? "active" : ""
							}`}
						>
							Contacto
						</Link>
					</nav>
				</div>
			</header>

			{/* Overlay para mobile menu */}
			{isMobileMenuOpen && (
				<div
					className="mobile-overlay"
					onClick={() => setIsMobileMenuOpen(false)}
				/>
			)}

			<CarritoComponent
				isOpen={isCarritoOpen}
				onClose={() => setIsCarritoOpen(false)}
				authOpen={() => setIsModalOpen(true)}
			/>

			<AuthComponent
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
