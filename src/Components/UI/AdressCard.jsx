import { MapPin, Home, Check } from "lucide-react";

export const AdressCard = ({ direccion, onSelect, isSelected = false }) => {
	const handleSelect = () => {
		const newSelectedState = !isSelected;

		if (onSelect) {
			console.log("Direccion seleccionada: ", direccion);
			onSelect(direccion, newSelectedState);
		}
	};

	return (
		<div className={`adress-card ${isSelected ? "selected" : ""}`}>
			{/* Header con icono y badge principal */}
			<div className="adress-header">
				<div className="adress-icon">
					<Home size={20} />
				</div>
				{direccion.esPrincipal && (
					<span className="principal-badge">Principal</span>
				)}
			</div>

			<div className="adress-content">
				<h4 className="adress-title">{direccion.alias || "Mi Dirección"}</h4>

				<div className="adress-details">
					<p className="adress-line">
						<MapPin size={16} />
						{direccion.direccion} {direccion.altura}
					</p>
				</div>

				{direccion.observaciones && (
					<div className="adress-notes">
						<p>{direccion.observaciones}</p>
					</div>
				)}
			</div>

			<div className="adress-actions">
				<button
					className={`select-btn ${isSelected ? "selected" : ""}`}
					onClick={handleSelect}
				>
					{isSelected ? (
						<>
							<Check size={16} />
							Seleccionada
						</>
					) : (
						"Seleccionar"
					)}
				</button>
			</div>
		</div>
	);
};
