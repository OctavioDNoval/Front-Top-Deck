import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

const apiUrl = import.meta.env.VITE_API_URL_BASE;

export const useTags = () => {
	const [tags, setTags] = useState([]);
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState("");

	const { token } = useContext(AuthContext);

	useEffect(() => {
		obtenerTags();
	}, []);

	const obtenerTags = async () => {
		setisLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/tags/public/getAll`);

			if (!res.ok) {
				throw new Error(`ERROR ${res.status}: ${res.text}`);
			}

			const data = await res.json();
			console.log("Array de tags: ", data);
			setTags(data);
		} catch (e) {
			console.log("Error en el hook: ", e.message);
		} finally {
			setisLoading(false);
		}
	};

	const agregarTag = async (newTag) => {
		setisLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/tags/admin/post`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(newTag),
			});

			if (!res.ok) {
				throw new Error("Error en el fetch del hook: ", res.statusText);
			}

			const tagSaved = await res.json();
			console.log("tag guardado: ", tagSaved);

			setTags((prev) => [...prev, tagSaved]);
			return tagSaved;
		} catch (e) {
			console.error("Error en el hook: ", e.message);
		} finally {
			setisLoading(false);
		}
	};

	const deleteTag = async (id) => {
		setisLoading(true);
		setError("");
		try {
			const res = await fetch(`${apiUrl}/tags/admin/delete/${id}`, {
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (!res.ok) {
				throw new Error("Error en el hook al elimianar ", res.statusText);
			}

			setTags((prev) => prev.filter((t) => t.idTag != id));
			return true;
		} catch (e) {
			console.error("Error en el fetch del hook ".e.message);
		} finally {
			setisLoading(false);
		}
	};

	return {
		tags,
		isLoading,
		error,
		obtenerTags,
		agregarTag,
		deleteTag,
	};
};
