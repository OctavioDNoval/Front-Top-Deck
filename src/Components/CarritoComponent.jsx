import { useContext, useEffect, useEffectEvent, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { CarritoCard } from "./UI/CarritoCard";
import { CarritoEfimeroComponent } from "./CarritoEfimeroComponent";
import { useFormatNum } from "../Hooks/useFormatNum";
import { useNavigate } from "react-router-dom";

export const CarritoComponent = ({ isOpen, onClose, authOpen }) => {
	const {
		carrito,
		isFetching,
		token,
		user,
		carritoProductos,
		eliminarProductoDelCarrito,
		actualizarCarrito,
	} = useContext(AuthContext);

	const [error, setError] = useState("");
	const [subTotal, setSubTotal] = useState(0);
	const navigate = useNavigate();

	const { formatPrice } = useFormatNum();

	useEffect(() => {
		if (isOpen && carrito) {
			actualizarCarrito();
		}
	}, [isOpen, carrito]);

	useEffect(() => {
		let total = 0;
		carritoProductos.forEach((p) => {
			total += p.cantidad * p.productoDTO.precio;
		});
		setSubTotal(total);
	}, [carritoProductos]);

	const handleDelete = async (id_DetalleCarito) => {
		await eliminarProductoDelCarrito(id_DetalleCarito);
	};

	return (
		<div
			className={isOpen ? "auth-component-background" : ""}
			onClick={onClose}
		>
			<aside
				className={`carrito-component ${isOpen ? "open" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				{carrito ? (
					<>
						<h3 className="carrito-title">CARRITO</h3>
						<h5 className="carrito-username">{user?.nombre}</h5>
						<div className="carrito-productos-contendor">
							{carritoProductos.map((c) => (
								<CarritoCard
									detalleCarrito={c}
									key={c.id_DetalleCarito}
									onDelete={() => handleDelete(c.id_DetalleCarrito)}
								/>
							))}
						</div>
						<div className="total-container">
							<div className="total-wrapper">
								<p>Subtotal</p>
								<p>${formatPrice(subTotal)}</p>
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
				) : (
					<>
						<CarritoEfimeroComponent onClose={onClose} />
					</>
				)}
			</aside>
		</div>
	);
};
