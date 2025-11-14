export const AdminLogs = ({ log }) => {
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
		<div className="admin-product-card">
			<p className="admin-product ">{log.nombreUsuario}</p>
			<p className="admin-product ">{formatDate(log.fechaAudit)}</p>
			<p className="admin-product ">{log.accion}</p>
			<p className="admin-product ">{log.tabla}</p>
			<p className="admin-product ">{log.nombreEntidad}</p>
		</div>
	);
};
