export const ViewProductModal = ({ isOpen, onClose, product }) => {
	if (!isOpen) return;

	return (
		<article className="admin-view-product">
			<div className="view-product-img-container">
				<img src={product.img_url} alt={product.nombre} />
			</div>
		</article>
	);
};
