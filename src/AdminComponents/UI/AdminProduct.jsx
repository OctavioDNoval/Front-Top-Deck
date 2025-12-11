import { useFormatNum } from "../../Hooks/useFormatNum";

export const AdminProduct = ({ product, onClick, isMobile = false }) => {
	const { formatPrice } = useFormatNum();

	return (
		<div
			className={`admin-product-card ${isMobile ? "mobile" : ""}`}
			onClick={onClick}
		>
			<p className="admin-product name">{product.nombre}</p>
			<p className="admin-product price">${formatPrice(product.precio)}</p>
			<p className="admin-product category">{product.categoriaNombre}</p>
			<p className="admin-product stock">{product.stock}</p>
		</div>
	);
};
