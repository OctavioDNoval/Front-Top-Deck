import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import { useDireccion } from "../../Hooks/useDireccion";
import { LoadingSpinner } from "./LoadingSpinner";

export const AddDirectionModal = ({ isOpen, onClose }) => {
	const [calle, setCalle] = useState("");
	const [altura, setAltura] = useState("");
	const [piso, setPiso] = useState("");
	const [provincia, setProvincia] = useState("");
	const [provincias, setProvincias] = useState([]);
	const [ciudad, setCiudad] = useState("");
	const [codigoPostal, setCodigoPostal] = useState("");
	const [principal, setPrincipal] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const { user } = useContext(AuthContext);
	const { agregarDireccionConUsuario } = useDireccion();

	useEffect(() => {
		const cargarProvincias = async () => {
			try {
				const res = await fetch(
					"https://apis.datos.gob.ar/georef/api/provincias"
				);
				const data = await res.json();
				setProvincias(data.provincias || []);
			} catch (error) {
				console.error("Error cargando provincias:", error);
			}
		};
		cargarProvincias();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const direccion = {
				id_usuario: user.id_usuario,
				ciudad: ciudad.trim() || "",
				provincia: provincia.trim() || "",
				pais: "Argentina",
				codigo_postal: codigoPostal.trim(),
				direccion: calle.trim() || "",
				altura: altura.trim() || "",
				piso: piso.trim() || "",
				principal: principal,
			};

			const direccionGuardada = await agregarDireccionConUsuario(direccion);
			console.log("Direccion guardada correctamente: ", direccionGuardada);

			onClose();
		} catch (e) {
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	if (!isOpen) return null;

	return (
		<div className="modal-backdrop" onClick={onClose}>
			<article
				className="add-direction-modal"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-header">
					<h2 className="modal-title">Agregar Nueva Dirección</h2>
					<button className="close-button" onClick={onClose}>
						<X size={24} />
					</button>
				</div>

				<form className="direction-form" onSubmit={handleSubmit}>
					<div className="form-section">
						<h3 className="section-title">Información de la Dirección</h3>

						<div className="address-grid">
							<div className="input-field">
								<label htmlFor="calle" className="input-label">
									Calle *
								</label>
								<input
									type="text"
									id="calle"
									name="calle"
									value={calle}
									onChange={(e) => setCalle(e.target.value)}
									className="form-input"
									placeholder="Nombre de la calle"
									required
								/>
							</div>

							<div className="input-field">
								<label htmlFor="altura" className="input-label">
									Altura *
								</label>
								<input
									type="text"
									id="altura"
									name="altura"
									value={altura}
									onChange={(e) => setAltura(e.target.value)}
									className="form-input"
									placeholder="Altura"
									required
								/>
							</div>

							<div className="input-field">
								<label htmlFor="piso" className="input-label">
									Piso (opcional)
								</label>
								<input
									type="text"
									id="piso"
									name="piso"
									value={piso}
									onChange={(e) => setPiso(e.target.value)}
									className="form-input"
									placeholder="Número de piso"
								/>
							</div>
						</div>

						<div className="location-grid">
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
								<label htmlFor="provincia" className="input-label">
									Provincia *
								</label>
								<select
									id="provincia"
									name="provincia"
									value={provincia}
									onChange={(e) => setProvincia(e.target.value)}
									className="form-select"
									required
								>
									<option value="">Selecciona una provincia</option>
									{provincias.map((provincia) => (
										<option key={provincia.id} value={provincia.nombre}>
											{provincia.nombre}
										</option>
									))}
								</select>
							</div>

							<div className="input-field">
								<label htmlFor="ciudad" className="input-label">
									Ciudad *
								</label>
								<input
									type="text"
									id="ciudad"
									name="ciudad"
									value={ciudad}
									onChange={(e) => setCiudad(e.target.value)}
									className="form-input"
									placeholder="Nombre de la ciudad"
									required
								/>
							</div>

							<div className="input-field">
								<label htmlFor="codigoPostal" className="input-label">
									Código Postal *
								</label>
								<input
									type="text"
									id="codigoPostal"
									name="codigoPostal"
									value={codigoPostal}
									onChange={(e) => setCodigoPostal(e.target.value)}
									className="form-input"
									placeholder="Ej: 1425"
									required
								/>
							</div>
						</div>
					</div>

					<div className="checkbox-field">
						<label className="checkbox-label">
							<input
								type="checkbox"
								name="esPrincipal"
								className="checkbox-input"
								checked={principal}
								onChange={() => setPrincipal(!principal)}
							/>
							<span className="checkmark"></span>
							Establecer como dirección principal
						</label>
					</div>

					<div className="modal-actions">
						<button type="button" className="btn-secondary" onClick={onClose}>
							Cancelar
						</button>
						<button type="submit" className="btn-primary">
							{isLoading ? (
								<LoadingSpinner size={20} color="white" />
							) : (
								<span>Guardar Dirección</span>
							)}
						</button>
					</div>
				</form>
			</article>
		</div>
	);
};
