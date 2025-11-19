import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

const apiUrl = `${import.meta.env.VITE_API_URL_BASE}/user`;

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
			const res = await fetch(`${apiUrl}/admin/getAll`, {
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

	const agregarUsuarioSinContrasenia = async (usuario) => {
		setIsLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/public/usuario/!contrasenia`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(usuario),
			});

			if (!res.ok) {
				throw new Error("Error al cargar el nuevo usuario sin contrasenia");
			}

			const data = await res.json();
			console.log("Usuario sin contrasenia guardado: ", data);
			localStorage.setItem("Usuario", JSON.stringify(data));
			return data;
		} catch (e) {
			console.log("Error en el hook: ", e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		usuarios,
		isLoading,
		error,
		obtenerUsuarios,
		agregarUsuarioSinContrasenia,
	};
};
