import { useContext } from "react";
import { CarritoCard } from "./UI/CarritoCard";
import { CarritoEfimeroContext } from "../CarritoEfimeroProvider";
import { useNavigate } from "react-router-dom";
import { useFormatNum } from "../Hooks/useFormatNum";

export const CarritoEfimeroComponent = ({ onClose }) => {
	const navigate = useNavigate();

	const { carritoEfimero, totalCarrito, eliminarDelCarritoEfimero } =
		useContext(CarritoEfimeroContext);

	const { formatPrice } = useFormatNum();

	const handleDelete = (id) => {
		eliminarDelCarritoEfimero(id);
	};

	const normalizarItemCarrito = (item) => {
		return {
			productoDTO: {
				idProducto: item.producto.idProducto,
				nombre: item.producto.nombre,
				precio: item.producto.precio,
				img_url: item.producto.img_url,
			},
			cantidad: item.cantidad,
		};
	};

	return (
		<>
			<h3 className="carrito-title">CARRITO</h3>
			<div className="carrito-productos-contendor">
				{carritoEfimero.map((c) => (
					<CarritoCard
						detalleCarrito={normalizarItemCarrito(c)}
						key={c.producto.idProducto}
						onDelete={() => handleDelete(c.producto.idProducto)}
					/>
				))}
			</div>
			<div className="total-container">
				<div className="total-wrapper">
					<p>Subtotal</p>
					<p>${formatPrice(totalCarrito)}</p>
				</div>
				<div className="btn-cart-container">
					<button
						className="buy-cart-btn"
						onClick={() => {
							navigate("/pedido");
							onClose();
						}}
					>
						Comprar
					</button>
				</div>
			</div>
		</>
	);
};
