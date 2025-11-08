import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const useCategorias = () => {
	const [categorias, setCategorias] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState("");

	const { token } = useContext(AuthContext);

	const obtenerCategorias = async () => {
		setisLoading(true);
		setError("");

		try {
			const res = await fetch(`${apiUrl}/category/public/getAll`);
			if (!res.ok) {
				const data = await res.statusText();
				throw new Error(`ERROR ${res.status}: ${data}`);
			}
			const data = await res.json();
			setCategorias(data);
		} catch (e) {
			console.log("ERROR EN CARGA DE CATEGORIAS: ", e);
			setError(e);
		} finally {
			setisLoading(false);
		}
	};

	const agregarCategoria = async (nombreCategoriaNueva) => {
		setisLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/category/admin/new`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(nombreCategoriaNueva),
			});

			if (!res.ok) {
				throw new Error("Error al cargar una categoria nueva");
			}

			const categoriaGuardada = await res.json();
			console.log(`Categoria Guardada, ${categoriaGuardada}`);

			setCategorias((prev) => [...prev, categoriaGuardada]);
			return categoriaGuardada;
		} catch (e) {
			console.error(e.message);
		} finally {
			setisLoading(false);
		}
	};

	const actualizarCategoria = async (id, categoriaNueva) => {
		setisLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/category/admin/edit/${id}`, {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${apiUrl}`,
				},
				body: JSON.stringify(categoriaNueva),
			});

			if (!res.ok) {
				throw new Error(`Error ${res.status}: ${res.statusText}`);
			}

			const categoriaActualizado = await res.json();

			setCategorias((prev) =>
				prev.map((p) => (p.idCategoria === id ? categoriaActualizado : p))
			);
		} catch (e) {
			throw new Error(e.message);
		} finally {
			setisLoading(false);
		}
	};

	const eliminarCategoria = async (id) => {
		setisLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/category/admin/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Error al eliminar la categoria");
			}

			setCategorias((prev) => prev.filter((c) => c.idCategoria != id));
			return true;
		} catch (e) {
			console.error(e.message);
		} finally {
			setisLoading(false);
		}
	};

	useEffect(() => {
		obtenerCategorias();
	}, []);

	return {
		categorias,
		isLoading,
		error,
		obtenerCategorias,
		agregarCategoria,
		actualizarCategoria,
		eliminarCategoria,
	};
};
