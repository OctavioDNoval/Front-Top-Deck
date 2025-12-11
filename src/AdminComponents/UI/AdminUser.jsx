export const AdminUser = ({ usuario, onClick, isMobile = false }) => {
	return (
		<div
			className={`admin-product-card ${isMobile ? "mobile" : ""}`}
			onClick={onClick}
		>
			<p className="admin-product name">{usuario.nombre}</p>
			<p className="admin-product email">{usuario.email}</p>
			<p className="admin-product telefono">
				{usuario.telefono ? usuario.telefono : "No disponible"}
			</p>
			<p className="admin-product rol">{usuario.rol}</p>
		</div>
	);
};
