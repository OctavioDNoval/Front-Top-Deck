const apiUrl = `${import.meta.env.VITE_API_URL_BASE}/direccion`;

export const useDireccion = () => {
	const agregarDireccionSinUsuario = async (direccion) => {
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
			localStorage.setItem("Direccion", JSON.stringify(data));
			return data;
		} catch (e) {
			console.log(e);
		}
	};

	return {
		agregarDireccionSinUsuario,
	};
};
