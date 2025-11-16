import { EventoCard } from "../Components/UI/EventoCard";
import { useEventos } from "../Hooks/useEventos";

export const EventosPage = () => {
	const { eventos } = useEventos();

	return (
		<>
			<h1 className="eventos-title">EVENTOS</h1>
			<section className="eventos-section user">
				{eventos.map((e) => (
					<EventoCard key={e.idEvento} evento={e} />
				))}
			</section>
		</>
	);
};
