import {
	Instagram,
	Mail,
	Phone,
	MapPin,
	Heart,
	Shield,
	Truck,
	CreditCard,
} from "lucide-react";

export const FooterComponent = () => {
	return (
		<footer className="footer">
			{/* Sección superior con información principal */}
			<div className="footer-main">
				<div className="footer-brand">
					<div className="logo-container">
						<h2 className="footer-logo">TopDeck Importados</h2>
						<p className="footer-tagline">Tu puerta a los TCG japoneses</p>
					</div>
					<div className="footer-desc">
						<p className="desc">
							Importamos directamente desde Japón los mejores productos TCG.
							Ofrecemos booster packs, cartas promocionales y figuras
							coleccionables con la mejor calidad y autenticidad garantizada.
						</p>
					</div>
				</div>

				<div className="footer-sections">
					{/* Enlaces rápidos */}
					<div className="footer-section">
						<h3 className="footer-title">Navegación</h3>
						<ul className="footer-links">
							<li>
								<a href="/">Inicio</a>
							</li>
							<li>
								<a href="/productos">Productos</a>
							</li>
							<li>
								<a href="/novedades">Novedades</a>
							</li>

							<li>
								<a href="/about">Nosotros</a>
							</li>
						</ul>
					</div>

					{/* Categorías */}
					<div className="footer-section">
						<h3 className="footer-title">Categorías</h3>
						<ul className="footer-links">
							<li>
								<a href="/categoria/booster-packs">Booster Packs</a>
							</li>
							<li>
								<a href="/categoria/cartas-promocionales">
									Cartas Promocionales
								</a>
							</li>
							<li>
								<a href="/categoria/colecciones">Colecciones</a>
							</li>
							<li>
								<a href="/categoria/figuras">Figuras</a>
							</li>
							<li>
								<a href="/categoria/accesorios">Accesorios</a>
							</li>
						</ul>
					</div>

					{/* Información de contacto */}
					<div className="footer-section">
						<h3 className="footer-title">Contacto</h3>
						<div className="contact-info">
							<div className="contact-item">
								<Mail size={16} color="white" />
								<span>@gmail.com</span>
							</div>
							<div className="contact-item">
								<Phone size={16} color="white" />
								<span>+54 11 2345-6789</span>
							</div>
							<div className="contact-item">
								<MapPin size={16} color="white" />
								<span>Buenos Aires, Argentina</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Sección de features */}
			<div className="footer-features">
				<div className="feature-item">
					<Shield size={32} color="white" />
					<div>
						<h4>Productos 100% Originales</h4>
						<p>Importados directamente desde Japón</p>
					</div>
				</div>
				<div className="feature-item">
					<Truck size={32} color="white" />
					<div>
						<h4>Envíos a todo el país</h4>
						<p>Rápidos y seguros</p>
					</div>
				</div>
				<div className="feature-item">
					<CreditCard size={32} color="white" />
					<div>
						<h4>Pagos seguros</h4>
						<p>Múltiples métodos de pago</p>
					</div>
				</div>
			</div>

			{/* Redes sociales */}
			<div className="footer-social">
				<h3 className="social-title">Seguinos en nuestras redes</h3>
				<div className="social-links">
					<a href="#" className="social-link" aria-label="Instagram">
						<Instagram size={24} />
					</a>
					<a href="#" className="social-link" aria-label="Email">
						<Mail size={24} />
					</a>
					<a href="#" className="social-link" aria-label="Teléfono">
						<Phone size={24} />
					</a>
				</div>
			</div>

			{/* Línea inferior */}
			<div className="footer-bottom">
				<div className="footer-bottom-content">
					<p className="copyright">
						&copy; {new Date().getFullYear()} TopDeck Importados. Todos los
						derechos reservados.
					</p>

					<p className="made-with">
						Hecho con <Heart size={14} /> para la comunidad TCG
					</p>
				</div>
			</div>
		</footer>
	);
};
