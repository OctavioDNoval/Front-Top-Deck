import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";

export const PedidoPage = () => {
	const { user } = useContext(AuthContext);
	const [provincias, setProvincias] = useState([]);

	useEffect(() => {
		const obtenerProvincias = async () => {
			try {
				const res = await fetch(
					"https://apis.datos.gob.ar/georef/api/provincias"
				);
				if (!res.ok) {
					throw new Error("Error al traer las provincias");
				}

				const data = await res.json();
				if (data.provincias && Array.isArray(data.provincias)) {
					setProvincias(data.provincias);
					console.log("Provincias cargadas:", data.provincias);
				} else {
					throw new Error("Formato de respuesta inesperado");
				}
			} catch (e) {
				console.log(e);
			}
		};
		obtenerProvincias();
	}, []);

	useEffect(() => {
		console.log(provincias);
	}, [provincias]);

	return (
		<section className="product-page">
			{user ? (
				<div className="confirm-pedido-container"></div>
			) : (
				<form action="">
					<div>
						<label htmlFor="usuario-nombre">Nombre</label>
						<input type="text" name="usuario-nombre" id="usuario-nombre" />
					</div>
					<div>
						<label htmlFor="usuario-email">Email</label>
						<input type="email" name="usuario-email" id="usuario-email" />
					</div>
					<div>
						<div>
							<label htmlFor="usuario-provincia">Provincia</label>
							<select name="usuario-provincia" id="usuario-provincia">
								{provincias.map((p) => {
									return <option value={p.nombre}>{p.nombre}</option>;
								})}
							</select>
						</div>
					</div>
				</form>
			)}
			<aside className="carrito-resume"></aside>
		</section>
	);
};
