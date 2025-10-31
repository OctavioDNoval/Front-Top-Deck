import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { CarritoCard } from "../Components/UI/CarritoCard";

export const CarritoPage = () => {
	const { user, isLoading } = useContext(AuthContext);

	const [carritoProductos, setCarritoProductos] = useState([]);
	const [error, setError] = useState("");
	const [isFetching, setisFetching] = useState(false);

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
		if (isLoading || !user) return;

		const fetchData = async () => {
			setisFetching(true);
			try {
				const res = await fetch(`${apiUrl}/carrito/usuario/${user.id_usuario}`);
				if (!res.ok) {
					const errData = await res.json();
					throw new Error(errData.message || "Error al cargar el carrito");
				} else {
					const carrito = await res.json();
					if (carrito?.idCarrito) {
						fetchCarrito(carrito.id_carrito);
						setisFetching(false);
					} else {
						throw new Error("carrito no encontrado ");
					}
				}
			} catch (e) {
				setError(e.message);
			} finally {
				setisFetching(false);
			}
		};

		fetchData();
	}, [user, isLoading]);

	return (
		<section className="carrito-container">
			{carritoProductos.map((p) => (
				<CarritoCard product={p} />
			))}
		</section>
	);
};
