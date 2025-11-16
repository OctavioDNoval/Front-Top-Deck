import { useState } from "react";
import { useEventos } from "../../Hooks/useEventos";

export const AddEventoModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState("");
	const [ubicacion, setUbicacion] = useState("");
	const [fecha, setFecha] = useState("");
	const [hora, setHora] = useState("");
	const [precio, setPrecio] = useState("");

	const [subiendo, setSubiendo] = useState(false);

	const { guardarEvento } = useEventos();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setSubiendo(true);
		try {
			const newEvento = {
				nombreEvento: nombre.trim(),
				ubicacion: ubicacion.trim(),
				fecha: fecha,
				hora: hora + ":00",
				precioEntrada: precio ? parseFloat(precio) : 0,
			};

			console.log("Subiendo Evento: ", newEvento);
			const eventoSubido = await guardarEvento(newEvento);
			console.log("Evento subido correctamente: ", eventoSubido);
			onClose();
			resetForm();
		} catch (e) {
			console.log("Error en el modal ", e);
		} finally {
			setSubiendo(false);
		}
	};

	const resetForm = () => {
		setNombre("");
		setUbicacion("");
		setFecha("");
		setHora("");
		setPrecio("");
	};

	if (!isOpen) return null;

	return (
		<article className="add-product-modal">
			<div>
				<div>
					<h2>
						Agregar Evento
						<button
							type="button"
							onClick={() => {
								onClose();
								resetForm();
							}}
						>
							X
						</button>
					</h2>
				</div>
				<div className="add-product-form">
					<form method="post" onSubmit={handleSubmit}>
						{/*Nombre del evento */}
						<div className="add-product-input">
							<label htmlFor="nombre-evento">Nombre</label>
							<input
								type="text"
								placeholder="Nombre Evento"
								id="nombre-evento"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
						</div>

						{/*Ubicacion del evento */}
						<div className="add-product-input">
							<label htmlFor="ubicacion-evento">Ubicacion</label>
							<input
								type="text"
								placeholder="Ubicacion Evento"
								id="ubicacion-evento"
								value={ubicacion}
								onChange={(e) => setUbicacion(e.target.value)}
							/>
						</div>

						{/*Fecha del evento */}
						<div className="add-product-input">
							<label htmlFor="fecha-evento">Fecha</label>
							<input
								type="date"
								id="fecha-evento"
								value={fecha}
								onChange={(e) => setFecha(e.target.value)}
							/>
						</div>

						{/*Hora del evento */}
						<div className="add-product-input">
							<label htmlFor="hora-evento">Hora</label>
							<input
								type="time"
								pattern="[0-9]{2}:[0-9]{2}"
								id="hora-evento"
								value={hora}
								onChange={(e) => setHora(e.target.value)}
							/>
						</div>

						{/*Precio del evento */}
						<div className="add-product-input">
							<label htmlFor="precio-evento">Precio</label>
							<input
								type="number"
								id="precio-evento"
								value={precio}
								onChange={(e) => setPrecio(e.target.value)}
							/>
						</div>

						<button type="submit" disabled={subiendo}>
							{subiendo ? "Subiendo..." : "Agregar"}
						</button>
					</form>
				</div>
			</div>
		</article>
	);
};
