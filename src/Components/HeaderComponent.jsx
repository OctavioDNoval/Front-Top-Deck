import { Volleyball } from "lucide-react";

export const HeaderComponent = () => {
	return (
		<header className="header">
			<div className="logo-container">
				<Volleyball />
			</div>
			<ul className="header-list">
				<li className="header-list-item">Inicio</li>
				<li className="header-list-item">Sobres</li>
				<li className="header-list-item">Collection</li>
				<li className="header-list-item">Promos</li>
				<li className="header-list-item">Contacto</li>
			</ul>
		</header>
	);
};
