import { Trash2 } from "lucide-react";

export const CarritoCard = ({ detalleCarrito, onDelete }) => {
	console.log("detalle carrito: ", detalleCarrito);

	return (
		<article className="carrito-card">
			<div className="carrito-card-img-container">
				<img
					src={detalleCarrito.productoDTO.img_url}
					alt={detalleCarrito.productoDTO.nombre}
					className="carrito-card-img"
				/>
			</div>
			<div className="carrito-card-product-info">
				<h4>{detalleCarrito.productoDTO.nombre}</h4>
				<div className="carrito-card-price-container">
					<p>
						${detalleCarrito.productoDTO.precio} x {detalleCarrito.cantidad}
					</p>
				</div>
			</div>
			<button className="delete-carrito-card" onClick={onDelete}>
				<Trash2 />
			</button>
		</article>
	);
};
