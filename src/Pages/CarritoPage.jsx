import { useContext, useEffect, useEffectEvent, useState } from "react";
import { AuthContext } from "../AuthProvider";

export const CarritoPage = () => {
	const { carrito, isFetching, token } = useContext(AuthContext);

	const [carritoProductos, setCarritoProductos] = useState([]);
	const [error, setError] = useState("");

	const apiUrl = import.meta.env.VITE_API_URL_BASE;

	const fetchCarrito = async (idCarrito) => {
		try {
			const res = await fetch(`${apiUrl}/carrito/user/${idCarrito}/detalles`, {
				headers: { Authorization: `Bearer ${token}` },
			});
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
	}, [isFetching, carrito, token]);

	return (
		<section className="carrito-container">
			{carrito ? (
				<p color="black">CArrito nasheeee</p>
			) : (
				<p color="black">:( </p>
			)}
			{carritoProductos.map((p) => (
				<p>nashe</p>
			))}
		</section>
	);
};
