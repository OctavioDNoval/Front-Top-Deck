import { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";

const apiUrl = `${import.meta.env.VITE_API_URL_BASE}/direccion`;

export const useDireccion = () => {
	const [direcciones, setDirecciones] = useState([]);

	const { token } = useContext(AuthContext);

	const agregarDireccionSinUsuario = async (direccion, guardarDatos) => {
		try {
			const res = await fetch(`${apiUrl}/public/save/nouser`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(direccion),
			});

			if (!res.ok) {
				throw new Error("Error en el hook, ", res.status);
			}

			const data = await res.json();
			if (guardarDatos) {
				localStorage.setItem("Direccion", JSON.stringify(data));
			}
			return data;
		} catch (e) {
			console.log(e);
		}
	};

	const traerDireccionesDeUnUsuario = async (idUsuario) => {
		try {
			const res = await fetch(`${apiUrl}/user/getAll/${idUsuario}`, {
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Error en el hook para conseguir las direcciones");
			}

			const data = await res.json();
			setDirecciones(data);
		} catch (e) {
			console.error(e);
		}
	};

	const agregarDireccionConUsuario = async (newDireccion) => {
		try {
			const res = await fetch(`${apiUrl}/public/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newDireccion),
			});

			if (!res.ok) {
				throw new Error("Error al agregar la direccion al usuario");
			}

			const data = await res.json();
			return data;
		} catch (e) {
			console.error(e);
		}
	};

	return {
		agregarDireccionSinUsuario,
		direcciones,
		traerDireccionesDeUnUsuario,
		agregarDireccionConUsuario,
	};
};
