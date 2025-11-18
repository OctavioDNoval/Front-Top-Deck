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
				} else {
					throw new Error("Formato de respuesta inesperado");
				}
			} catch (e) {
				console.log(e);
			}
		};
		obtenerProvincias();
	}, []);

	return (
		<section className="pedido-page">
			<div className="pedido-container">
				{user ? (
					<div className="confirm-pedido-container">
						{/* Esto lo completarás después */}
					</div>
				) : (
					<div className="pedido-form-container">
						<div className="form-header">
							<h2 className="form-title">Información de Envío</h2>
							<p className="form-subtitle">
								Completa tus datos para finalizar la compra
							</p>
						</div>

						<form className="pedido-form">
							{/* Información Personal */}
							<div className="form-section">
								<h3 className="section-title">Datos Personales</h3>
								<div className="input-group">
									<div className="input-field">
										<label htmlFor="usuario-nombre" className="input-label">
											Nombre Completo
										</label>
										<input
											type="text"
											name="usuario-nombre"
											id="usuario-nombre"
											className="form-input"
											placeholder="Ingresa tu nombre completo"
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-email" className="input-label">
											Email
										</label>
										<input
											type="email"
											name="usuario-email"
											id="usuario-email"
											className="form-input"
											placeholder="ejemplo@email.com"
										/>
									</div>
								</div>
							</div>

							{/* Dirección */}
							<div className="form-section">
								<h3 className="section-title">Dirección de Envío</h3>
								<div className="input-grid">
									<div className="input-field">
										<label htmlFor="usuario-pais" className="input-label">
											País
										</label>
										<input
											type="text"
											value="Argentina"
											disabled
											className="form-input disabled"
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-provincia" className="input-label">
											Provincia
										</label>
										<select
											name="usuario-provincia"
											id="usuario-provincia"
											className="form-select"
										>
											<option value="">Selecciona una provincia</option>
											{provincias.map((p) => (
												<option key={p.id} value={p.nombre}>
													{p.nombre}
												</option>
											))}
										</select>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-ciudad" className="input-label">
											Ciudad
										</label>
										<input
											type="text"
											name="usuario-ciudad"
											id="usuario-ciudad"
											className="form-input"
											placeholder="Tu ciudad"
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-codigo" className="input-label">
											Código Postal
										</label>
										<input
											type="text"
											name="usuario-codigo"
											id="usuario-codigo"
											className="form-input"
											placeholder="Ej: 1425"
										/>
									</div>
									<div className="input-field full-width">
										<label htmlFor="usuario-calle" className="input-label">
											Calle
										</label>
										<input
											type="text"
											name="usuario-calle"
											id="usuario-calle"
											className="form-input"
											placeholder="Nombre de la calle"
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-altura" className="input-label">
											Altura
										</label>
										<input
											type="text"
											name="usuario-altura"
											id="usuario-altura"
											className="form-input"
											placeholder="Número"
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-piso" className="input-label">
											Piso/Departamento
										</label>
										<input
											type="text"
											name="usuario-piso"
											id="usuario-piso"
											className="form-input"
											placeholder="Opcional"
										/>
									</div>
								</div>
							</div>

							<div className="form-actions">
								<button type="submit" className="submit-btn">
									Continuar al Pago
								</button>
							</div>
						</form>
					</div>
				)}

				<aside className="carrito-resume">
					<div className="resume-placeholder">
						<h3>Resumen del Pedido</h3>
						<p>Aquí se mostrarán los productos del carrito</p>
					</div>
				</aside>
			</div>
		</section>
	);
};
