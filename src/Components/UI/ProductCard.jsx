import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {
	const navigate = useNavigate();

	const handleNavigate = () => {
		navigate(`/productos/${product.productoId}`);
	};

	return (
		<article className="product-card" onClick={handleNavigate}>
			<div className="prdocut-img-container">
				<img src="#" alt={product.nombre} />
			</div>
			<div className="product-title-container">
				<h3 className="product-title">{product.nombre}</h3>
			</div>
			<div className="bottom-product-container">
				<p className="product-price">${product.precio}</p>
				<button type="button" className="add-to-cart-btn">
					+
				</button>
			</div>
		</article>
	);
};
