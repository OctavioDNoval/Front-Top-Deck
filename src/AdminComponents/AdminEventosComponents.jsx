import { useState } from "react";
import { useEventos } from "../Hooks/useEventos";
import { EventoCard } from "../Components/UI/EventoCard";
import { AddEventoModal } from "./UI/AddEventoModal";

export const AdminEventosComponents = () => {
	const [addEventoModalOpen, setAddEventoModalOpen] = useState(false);

	const { eventos } = useEventos();

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
					<EventoCard evento={e} />
				))}
			</section>

			<AddEventoModal
				isOpen={addEventoModalOpen}
				onClose={() => setAddEventoModalOpen(false)}
			/>
		</>
	);
};
