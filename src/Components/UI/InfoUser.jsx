import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";

export const InfoUser = () => {
	const { user } = useContext(AuthContext);

	const getInitials = (name) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<section className="info-user-card">
			<div className="user-header">
				<div className="user-avatar">{getInitials(user.nombre)}</div>
				<div className="user-basic-info">
					<h3>{user.nombre}</h3>
					<span className="user-role">{user.rol}</span>
				</div>
			</div>

			<div className="user-details-grid">
				<div className="detail-item">
					<span className="detail-label">Email</span>
					<span className="detail-value">{user.email}</span>
				</div>

				<div className="detail-item">
					<span className="detail-label">Rol</span>
					<span className="detail-value">{user.rol}</span>
				</div>

				<div className="detail-item">
					<span className="detail-label">Estado</span>
					<span className="detail-value" style={{ color: "#48bb78" }}>
						● Activo
					</span>
				</div>
			</div>
		</section>
	);
};
