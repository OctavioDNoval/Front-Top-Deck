import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { ReceiptRussianRuble } from "lucide-react";

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const useUsuarios = () => {
	const [usuarios, setUsuarios] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { token } = useContext(AuthContext);

	useEffect(() => {
		obtenerUsuarios();
	}, []);

	const obtenerUsuarios = async () => {
		setIsLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/user/admin/getAll`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Error al cargar usuarios");
			}

			const data = await res.json();
			setUsuarios(data);
		} catch (e) {
			console.log("ERROR en el hook de usuarios: ", e.message);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		usuarios,
		isLoading,
		error,
		obtenerUsuarios,
	};
};
