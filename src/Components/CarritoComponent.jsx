import { useContext, useEffect, useEffectEvent, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { CreateAccount } from "./UI/CreateAccount";
import { CarritoCard } from "./UI/CarritoCard";

export const CarritoComponent = ({ isOpen, onClose, authOpen }) => {
	const { carrito, isFetching, token, user } = useContext(AuthContext);

	const [carritoProductos, setCarritoProductos] = useState([]);
	const [error, setError] = useState("");
	const [subTotal, setSubTotal] = useState(0);

	const apiUrl = import.meta.env.VITE_API_URL_BASE;

	const fetchCarrito = async (idCarrito) => {
		try {
			const res = await fetch(`${apiUrl}/carrito/user/${idCarrito}/detalles`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) {
				const text = await res.text();
				const errData = text ? JSON.parse(text) : { message: res.statusText };
				console.log(errData);
				throw new Error(errData);
			}

			const text = await res.text();
			const data = text ? JSON.parse(text) : [];
			setCarritoProductos(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (!isFetching && carrito) {
			fetchCarrito(carrito.idCarrito);
		}
	}, [isFetching, carrito, token]);

	useEffect(() => {
		let total = 0;
		carritoProductos.forEach((p) => {
			total += p.cantidad * p.productoDTO.precio;
		});
		setSubTotal(total);
	}, [carritoProductos]);

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
									onDelete={() =>
										setCarritoProductos((prev) =>
											prev.filter(
												(p) => p.id_DetalleCarrito !== c.id_DetalleCarrito
											)
										)
									}
								/>
							))}
						</div>
						<div className="total-container">
							<div className="total-wrapper">
								<p>Subtotal</p>
								<p>{subTotal}</p>
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
