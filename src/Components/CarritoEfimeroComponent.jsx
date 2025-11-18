import { useContext, useEffect, useState } from "react";
import { useCarritoEfimero } from "../Hooks/useCarritoEfimero";
import { CarritoCard } from "./UI/CarritoCard";
import { CarritoEfimeroContext } from "../CarritoEfimeroProvider";

export const CarritoEfimeroComponent = ({ isOpen }) => {
	const { carritoEfimero, totalCarrito, eliminarDelCarritoEfimero } =
		useContext(CarritoEfimeroContext);

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

	console.log(
		"Desde el componente del carrito este es el carrito: ",
		carritoEfimero
	);
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
					<p>${totalCarrito}</p>
				</div>
				<div className="btn-cart-container">
					<button className="buy-cart-btn">Comprar</button>
				</div>
			</div>
		</>
	);
};
