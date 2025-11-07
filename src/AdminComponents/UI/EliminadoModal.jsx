import { CircleCheck } from "lucide-react";

export const EliminadoModal = ({ isOpen }) => {
	if (!isOpen) return null;
	return (
		<div className="eliminado-modal">
			<CircleCheck size={80} strokeWidth={1.5} />
			<h3>Producto Eliminado</h3>
			<p>El producto fue eliminado correctamente</p>
		</div>
	);
};
