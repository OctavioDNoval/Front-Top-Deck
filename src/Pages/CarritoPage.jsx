import { useContext, useEffect, useEffectEvent, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { CarritoCard } from "../Components/UI/CarritoCard";

export const CarritoPage = () => {
	const { carrito, isFetching } = useContext(AuthContext);

	const [carritoProductos, setCarritoProductos] = useState([]);
	const [error, setError] = useState("");

	const apiUrl = import.meta.env.VITE_API_URL_BASE;

	const fetchCarrito = async (idCarrito) => {
		try {
			const res = await fetch(`${apiUrl}/carrito/user/${idCarrito}/detalles`);
			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message);
			}
			const data = await res.json();
			setCarritoProductos(data);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (!isFetching && carrito) {
			fetchCarrito(carrito.id_carrito);
		}
	}, [isFetching, carrito]);

	return (
		<section className="carrito-container">
			{carritoProductos.map((p) => (
				<CarritoCard product={p} />
			))}
		</section>
	);
};
