import { useNavigate } from "react-router-dom";
import { useFormatNum } from "../../Hooks/useFormatNum";

export const ProductCard = ({ product }) => {
	const navigate = useNavigate();
	const { formatPrice } = useFormatNum();

	const handleNavigate = () => {
		navigate(`/productos/${product.idProducto}`);
	};

	return (
		<article className="product-card" onClick={handleNavigate}>
			<div className="prdocut-img-container">
				<img src={product.img_url} alt={product.nombre} />
			</div>
			<div className="product-title-container">
				<h3 className="product-title">{product.nombre}</h3>
			</div>
			<div className="bottom-product-container">
				<p className="product-price">${formatPrice(product.precio)}</p>
				<button type="button" className="add-to-cart-btn">
					+
				</button>
			</div>
		</article>
	);
};
