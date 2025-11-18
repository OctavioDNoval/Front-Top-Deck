import { createContext, useEffect, useState } from "react";

export const CarritoEfimeroContext = createContext();

export const CarritoEfimeroProvider = ({ children }) => {
	const [carritoEfimero, setCarritoEfimero] = useState([]);
	const [totalCarrito, setTotalCarrito] = useState(0);

	const agregarAlCarritoEfimero = (producto, cantidad) => {
		if (!producto || !producto.idProducto) {
			console.log("Producto invalido");
			return;
		}

		const indexProducto = existeEnCarrito(producto.idProducto);

		if (indexProducto >= 0) {
			setCarritoEfimero((prev) => {
				const nuevoCarrito = [...prev];
				nuevoCarrito[indexProducto] = {
					producto: nuevoCarrito[indexProducto].producto,
					cantidad: nuevoCarrito[indexProducto].cantidad + cantidad,
				};
				return nuevoCarrito;
			});
		} else {
			const nuevoItem = {
				producto: producto,
				cantidad: cantidad,
			};
			setCarritoEfimero((prev) => [...prev, nuevoItem]);
		}
	};

	const eliminarDelCarritoEfimero = (idProducto) => {
		setCarritoEfimero((prev) =>
			prev.filter((p) => p.producto.idProducto !== idProducto)
		);
	};

	const existeEnCarrito = (idProducto) => {
		const productoExistente = carritoEfimero.findIndex((item) => {
			return item.producto.idProducto === idProducto;
		});

		return productoExistente;
	};

	useEffect(() => {
		const carritoGuardado = sessionStorage.getItem("carritoEfimero");
		if (carritoGuardado) {
			try {
				setCarritoEfimero(JSON.parse(carritoGuardado));
			} catch (e) {
				console.error("No se pudo traer el carrito guardado, ", e);
				sessionStorage.removeItem("carritoEfimero");
			}
		}
	}, []);

	useEffect(() => {
		sessionStorage.setItem("carritoEfimero", JSON.stringify(carritoEfimero));

		let subTotal = 0;
		carritoEfimero.forEach((item) => {
			subTotal += parseFloat(item.producto.precio) * item.cantidad;
		});
		setTotalCarrito(subTotal);
	}, [carritoEfimero]);

	return (
		<CarritoEfimeroContext.Provider
			value={{
				carritoEfimero,
				agregarAlCarritoEfimero,
				eliminarDelCarritoEfimero,
				totalCarrito,
			}}
		>
			{children}
		</CarritoEfimeroContext.Provider>
	);
};
