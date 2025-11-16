import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

const apiUrl = `${import.meta.env.VITE_API_URL_BASE}/eventos`;

export const useEventos = () => {
	const [eventos, setEventos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, seterror] = useState("");

	const { token } = useContext(AuthContext);

	const obtenerEventos = async () => {
		setIsLoading(true);
		seterror("");
		try {
			const res = await fetch(`${apiUrl}/public/getAll`);
			if (!res.ok) {
				throw new Error(`ERROR ${res.status}: ${res.text}`);
			}
			const data = await res.json();
			console.log("eventos: ", data);
			setEventos(data);
		} catch (e) {
			console.log("Error en el hook: ", e);
		} finally {
			setIsLoading(false);
		}
	};

	const guardarEvento = async (newEvento) => {
		setIsLoading(true);
		seterror("");
		try {
			const res = await fetch(`${apiUrl}/admin/save`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newEvento),
			});

			if (!res.ok) {
				throw new Error("Error en el hook: ", res.status);
			}

			const eventoSaved = await res.json();
			console.log("Evento Guardado: ", eventoSaved);

			setEventos((prev) => [...prev, eventoSaved]);
			return eventoSaved;
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	const borrarEvento = async (id) => {
		setIsLoading(true);
		seterror("");
		try {
			const res = await fetch(`${apiUrl}/admin/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Error en el hook al elimianar ", res.statusText);
			}

			setEventos((prev) => prev.filter((e) => e.idTag != id));
			return true;
		} catch (e) {
			console.error("Error en el fetch del hook ".e.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		obtenerEventos();
	}, []);

	return {
		eventos,
		isLoading,
		error,
		obtenerEventos,
		guardarEvento,
		borrarEvento,
	};
};
