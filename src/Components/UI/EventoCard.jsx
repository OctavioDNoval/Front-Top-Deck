export const EventoCard = ({ evento, onClick }) => {
	// Determinar clase del estado para estilos diferentes
	const getEstadoClass = (estado) => {
		switch (estado?.toLowerCase()) {
			case "proximamente":
				return "proximamente";
			case "en_curso":
				return "en_curso";
			case "finalizado":
				return "finalizado";
			default:
				return "proximamente";
		}
	};

	return (
		<article className="evento-card" onClick={onClick}>
			<div className="evento-header">
				<div className="evento-fecha">
					<span className="fecha-dia">{evento.fecha}</span>
				</div>
				<div className={`evento-estado ${getEstadoClass(evento.estado)}`}>
					{evento.estado}
				</div>
			</div>

			<div className="evento-content">
				<h3 className="evento-nombre">{evento.nombreEvento}</h3>
				<div className="evento-info">
					<div className="info-item">
						<span className="info-icon">📍</span>
						<span className="info-text">{evento.ubicacion}</span>
					</div>
					<div className="info-item">
						<span className="info-icon">🕒</span>
						<span className="info-text">{evento.hora}</span>
					</div>
					<div className="info-item">
						<span className="info-icon">💲</span>
						<span className="info-text">{evento.precioEntrada}</span>
					</div>
				</div>
			</div>
		</article>
	);
};
