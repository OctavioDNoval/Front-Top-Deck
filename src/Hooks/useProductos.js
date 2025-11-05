import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const useProductos = () => {
	const [productos, setProductos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { token } = useContext(AuthContext);

	const obtenerProductos = async () => {
		setIsLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/products/public/getAll`);
			if (!res.ok) {
				setError(`ERROR: ${res.status} - ${res.statusText}`);
				return;
			}
			const data = await res.json();
			setProductos(data);
		} catch (e) {
			console.log("ERROR: ", e);
		} finally {
			setIsLoading(false);
		}
	};

	const agregarProducto = async (newProduct) => {
		setIsLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/products/admin/post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					newProduct,
				}),
			});
			if (!res.ok) {
				throw new Error(res.statusText);
				return;
			}

			const productoGuardado = await res.json();

			setProductos((prev) => [...prev, productoGuardado]);

			return productoGuardado;
		} catch (e) {
			setError("ERROR:", e);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		obtenerProductos();
	}, []);

	return {
		productos,
		isLoading,
		error,
		obtenerProductos,
		agregarProducto,
	};
};
