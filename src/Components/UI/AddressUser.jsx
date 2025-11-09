import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";

export const AddressUser = () => {
	const { user } = useContext(AuthContext);

	return (
		<section className="address-user-card">
			<div className="address-header">
				<h3>Dirección de Envío</h3>
				<button className="edit-address-btn">Editar Dirección</button>
			</div>

			<div className="address-content">
				<p>No hay direcciones guardadas</p>
				<p style={{ fontSize: "0.9em", marginTop: "8px" }}>
					Agrega una dirección para realizar pedidos
				</p>
			</div>
		</section>
	);
};
