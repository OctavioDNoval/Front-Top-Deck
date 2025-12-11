import { useEffect, useState } from "react";
import { useLogs } from "../Hooks/useLogs";
import { AdminLogs } from "./UI/AdminLogs";
import { useMobile } from "../Hooks/useMobile";

export const AdminLogsComponent = () => {
	const { logs } = useLogs();
	const { isMobile } = useMobile();
	const [showAll, setShowAll] = useState(false);

	// Ordenar y limitar logs
	const sortedLogs = [...logs]
		.sort((a, b) => b.idAuditoria - a.idAuditoria)
		.slice(0, showAll ? logs.length : 100); // Mostrar 100 por defecto

	return (
		<article
			className={`admin-product-container logs ${isMobile ? "mobile" : ""}`}
		>
			<div className="admin-product-header">
				<div>Usuario</div>
				<div>Fecha</div>
				<div>Accion</div>
				<div>Tabla</div>
				<div>Nombre</div>
			</div>

			{sortedLogs.map((l) => (
				<AdminLogs key={l.idAuditoria} log={l} isMobile={isMobile} />
			))}

			{logs.length > 100 && (
				<div className="logs-footer">
					<button
						onClick={() => setShowAll(!showAll)}
						className="show-more-btn"
					>
						{showAll
							? `Mostrar menos (primeros 100 logs)`
							: `Mostrar todos los logs (${logs.length})`}
					</button>
					<span className="logs-count">
						Mostrando {sortedLogs.length} de {logs.length} logs
					</span>
				</div>
			)}
		</article>
	);
};
