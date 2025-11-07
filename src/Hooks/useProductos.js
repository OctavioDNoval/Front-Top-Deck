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
				body: JSON.stringify(newProduct),
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
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const actualizarProducto = async (id, newProducto) => {
		setIsLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/products/admin/edit/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newProducto),
			});

			if (!res.ok) {
				const errText = await res.statusText();
				throw new Error(`Error ${res.status}: ${errText}`);
			}

			const productoActualizado = await res.json();

			setProductos((prev) =>
				prev.map((p) => (p.idProducto === id ? productoActualizado : p))
			);

			return productoActualizado;
		} catch (e) {
			setError(e.message);
			throw e;
		} finally {
			setIsLoading(false);
		}
	};

	const eliminarProducto = async (id) => {
		setIsLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/products/admin/delete/${id}`, {
				method: "DELETE",
				headers: { Authorization: `Bearer ${token}` },
			});
			console.log(res.status);

			if (res.status === 204 || res.status === 200) {
				setProductos((prev) => prev.filter((p) => p.idProducto != id));
				return true;
			} else if (res.status === 404) {
				console.warn("producto no encontrado");
				return false;
			} else {
				console.error("Error al eliminar el producto");
				return false;
			}
		} catch (e) {
			console.log("Error", e.message);
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
		actualizarProducto,
		eliminarProducto,
	};
};
