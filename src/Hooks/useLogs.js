import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { isRouteErrorResponse } from "react-router-dom";

const apiUrl = `${import.meta.env.VITE_API_URL_BASE}/audit`;

export const useLogs = () => {
	const [logs, setLogs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");

	const { token } = useContext(AuthContext);

	const obtenerLogs = async () => {
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
				let errText = await res.text();
				throw new Error("Error en el hook: ", errText);
			}

			const data = await res.json();
			setLogs(data);
		} catch (e) {
			console.log(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		obtenerLogs();
	}, []);

	return {
		logs,
		isLoading,
		error,
		obtenerLogs,
	};
};
