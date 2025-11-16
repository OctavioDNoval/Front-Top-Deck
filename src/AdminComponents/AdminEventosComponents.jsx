import { useEffect, useState } from "react";
import { useEventos } from "../Hooks/useEventos";
import { EventoCard } from "../Components/UI/EventoCard";
import { AddEventoModal } from "./UI/AddEventoModal";
import { DeleteEventoModal } from "./UI/DeleteEventoModal";

export const AdminEventosComponents = () => {
	const [addEventoModalOpen, setAddEventoModalOpen] = useState(false);
	const [deleteEventoModalOpen, setDeleteEventoModalOpen] = useState(false);
	const [eventoSelected, setEventoSelected] = useState({});

	const handleClick = (evento) => {
		setDeleteEventoModalOpen(true);
		setEventoSelected(evento);
	};

	const { eventos, obtenerEventos } = useEventos();

	useEffect(() => {
		obtenerEventos();
	}, [addEventoModalOpen, deleteEventoModalOpen]);

	return (
		<>
			<button
				type="button"
				className="admin-btn"
				onClick={() => setAddEventoModalOpen(true)}
			>
				<i className="icon-plus" style={{ marginRight: "8px" }}>
					+
				</i>
				Agregar Evento
			</button>
			<section className="eventos-section">
				{eventos.map((e) => (
					<EventoCard
						key={e.idEvento}
						evento={e}
						onClick={() => handleClick(e)}
					/>
				))}
			</section>

			<AddEventoModal
				isOpen={addEventoModalOpen}
				onClose={() => setAddEventoModalOpen(false)}
			/>

			<DeleteEventoModal
				isOpen={deleteEventoModalOpen}
				onClose={() => setDeleteEventoModalOpen(false)}
				evento={eventoSelected}
			/>
		</>
	);
};
