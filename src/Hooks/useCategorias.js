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

	useEffect(() => {
		obtenerCategorias();
	}, []);

	return {
		categorias,
		isLoading,
		error,
		obtenerCategorias,
	};
};
