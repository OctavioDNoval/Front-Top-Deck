import { useContext, useEffect, useEffectEvent, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { CreateAccount } from "./UI/CreateAccount";
import { CarritoCard } from "./UI/CarritoCard";

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
						<h5 className="carrito-username">{user.nombre}</h5>
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
								<p>${subTotal}</p>
							</div>
							<div className="btn-cart-container">
								<button className="buy-cart-btn">Comprar</button>
							</div>
						</div>
					</>
				) : (
					<div className="create-account-card-container">
						<CreateAccount onClose={onClose} authOpen={authOpen} />
					</div>
				)}
			</aside>
		</div>
	);
};
