import { useState } from "react";
import { useEventos } from "../../Hooks/useEventos";

export const DeleteEventoModal = ({ isOpen, onClose, evento }) => {
	const [eliminando, setEliminando] = useState(false);

	const { borrarEvento } = useEventos();

	const handleDelete = async () => {
		setEliminando(true);
		try {
			const confirm = window.confirm("Quiere eliminar este evento?");
			if (confirm) {
				const res = await borrarEvento(evento.idEvento);

				if (res) {
					setEliminando(false);
					onClose();
				} else {
					alert("No se pudo eliminar el evento");
				}
			}
		} catch (e) {
		} finally {
			setEliminando(false);
		}
	};

	if (!isOpen) return null;

	return (
		<article className="add-product-modal">
			<div>
				<div>
					<h2>
						Eliminar Evento {evento.nombreEvento}
						<button
							type="button"
							onClick={() => {
								onClose();
							}}
						>
							X
						</button>
					</h2>
				</div>
				<div className="add-product-form">
					<div>
						<div className="buttons-wrapper">
							<button type="submit" onClick={onClose}>
								Cancelar
							</button>
							<button
								className="x"
								type="button"
								disabled={eliminando}
								onClick={() => handleDelete(evento.idEvento)}
							>
								{eliminando ? "Eliminando" : "Eliminar"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};
