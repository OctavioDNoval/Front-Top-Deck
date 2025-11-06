export const AdminProduct = ({ product }) => {
	console.log(product);
	return (
		<div className="admin-product-card">
			<p className="admin-product name">{product.nombre}</p>
			<p className="admin-product price">{product.precio}</p>
			<p className="admin-product category">{product.categoria.nombre}</p>
			<p className="admin-product stock">{product.stock}</p>
		</div>
	);
};
