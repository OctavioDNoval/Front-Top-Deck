export const usePedidos = () => {
	const obtenerIpUsuario = async () => {
		try {
			const res = await fetch("https://api.ipify.org/?format=json");
			const data = await res.json();
			return data.ip;
		} catch (e) {
			console.log(e);
			return null;
		}
	};

	return {
		obtenerIpUsuario,
	};
};
