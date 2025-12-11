import { CheckCircle, Mail, Shield, User } from "lucide-react";

export const InfoUser = ({ user, isMobile = false }) => {
	const getInitials = (name) => {
		return name
			.split(" ")
			.map((word) => word[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	};

	return (
		<div className={`info-card ${isMobile ? "mobile" : ""}`}>
			<div className="card-header">
				<div className="card-icon">
					<User size={24} />
				</div>
				<h3 className="card-title">Información Personal</h3>
			</div>

			<div className="card-content">
				<div className="info-grid">
					<div className="info-item">
						<div className="info-icon">
							<User size={16} />
						</div>
						<div className="info-details">
							<span className="info-label">Nombre completo</span>
							<span className="info-value">{user.nombre}</span>
						</div>
					</div>

					<div className="info-item">
						<div className="info-icon">
							<Mail size={16} />
						</div>
						<div className="info-details">
							<span className="info-label">Correo electrónico</span>
							<span className="info-value">{user.email}</span>
						</div>
					</div>

					<div className="info-item">
						<div className="info-icon">
							<Shield size={16} />
						</div>
						<div className="info-details">
							<span className="info-label">Tipo de cuenta</span>
							<span
								className={`info-badge ${
									user.rol === "admin" ? "admin" : "user"
								}`}
							>
								{user.rol === "admin" ? "Administrador" : "Usuario"}
							</span>
						</div>
					</div>

					<div className="info-item">
						<div className="info-icon">
							<CheckCircle size={16} />
						</div>
						<div className="info-details">
							<span className="info-label">Estado de la cuenta</span>
							<span className="info-status active">
								<CheckCircle size={12} />
								Activa
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
