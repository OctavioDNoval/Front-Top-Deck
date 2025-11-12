export const AdminProduct = ({ product, onClick }) => {
	return (
		<div className="admin-product-card" onClick={onClick}>
			<p className="admin-product name">{product.nombre}</p>
			<p className="admin-product price">{product.precio}</p>
			<p className="admin-product category">{product.categoriaNombre}</p>
			<p className="admin-product stock">{product.stock}</p>
		</div>
	);
};
