export const AdminLogs = ({ log, isMobile = false }) => {
	const formatDate = (stringDate) => {
		const date = new Date(stringDate);

		return new Intl.DateTimeFormat("es-AR", {
			day: "2-digit",
			month: "2-digit",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		}).format(date);
	};

	return (
		<div className={`admin-product-card ${isMobile ? "mobile" : ""}`}>
			<p className="admin-product usuario">{log.nombreUsuario}</p>
			<p className="admin-product fecha ">{formatDate(log.fechaAudit)}</p>
			<p className="admin-product accion ">{log.accion}</p>
			<p className="admin-product tabla">{log.tabla}</p>
			<p className="admin-product nombre">{log.nombreEntidad}</p>
		</div>
	);
};
