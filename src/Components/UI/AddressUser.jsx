import { Edit3, MapPin, Plus } from "lucide-react";

export const AddressUser = ({ isMobile = false }) => {
	return (
		<div className={`address-card ${isMobile ? "mobile" : ""}`}>
			<div className="card-header">
				<div className="card-icon">
					<MapPin size={24} />
				</div>
				<h3 className="card-title">Dirección de Envío</h3>
			</div>

			<div className="card-content">
				<div className="address-empty-state">
					<div className="empty-state-icon">
						<MapPin size={48} />
					</div>
					<h4 className="empty-state-title">Sin dirección guardada</h4>
					<p className="empty-state-description">
						Agrega una dirección para recibir tus productos
					</p>

					<div className="address-actions">
						<button className="add-address-btn">
							<Plus size={16} />
							Agregar Dirección
						</button>
						<button className="edit-address-btn">
							<Edit3 size={16} />
							Editar
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
