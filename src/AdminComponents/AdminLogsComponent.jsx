import { useEffect } from "react";
import { useLogs } from "../Hooks/useLogs";
import { AdminLogs } from "./UI/AdminLogs";

export const AdminLogsComponent = () => {
	const { logs } = useLogs();

	const sortedLogs = [...logs].sort((a, b) => b.idAuditoria - a.idAuditoria);

	return (
		<article className="admin-product-container logs">
			<div className="admin-product-header">
				<div>Usuario</div>
				<div>Fecha</div>
				<div>Accion</div>
				<div>Tabla</div>
				<div>Nombre</div>
			</div>
			{sortedLogs.map((l) => (
				<AdminLogs key={l.idAuditoria} log={l} />
			))}
		</article>
	);
};
