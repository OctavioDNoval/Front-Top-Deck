export const ProductCard = ({ product }) => {
	return (
		<article className="product-card">
			<div className="prdocut-img-container">
				<img src="#" alt={product.nombre} />
			</div>
			<div className="product-title-container">
				<h3 className="product-title">{product.nombre}</h3>
			</div>
			<div className="bottom-product-container">
				<p className="product-price">{product.precio}</p>
				<button type="button" className="add-to-cart-btn"></button>
			</div>
		</article>
	);
};
