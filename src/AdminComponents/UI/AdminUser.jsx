export const AdminUser = ({ usuario, onClick }) => {
	return (
		<div className="admin-product-card" onClick={onClick}>
			<p className="admin-product name">{usuario.nombre}</p>
			<p className="admin-product price">{usuario.email}</p>
			<p className="admin-product category">
				{usuario.telefono ? usuario.telefono : "No disponible"}
			</p>
			<p className="admin-product stock">{usuario.rol}</p>
		</div>
	);
};
