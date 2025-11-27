export const ModalUseDireccion = ({
	isOpen,
	onClose,
	isConfirmed,
	direccion,
}) => {
	console.log(direccion);

	const handleAcept = () => {
		isConfirmed(true);
		onClose();
	};

	const handleDecline = () => {
		isConfirmed(false);
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className="modal-overlay" onClick={onClose}>
			<article
				className="modal-direccion-found with-icon"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modal-icon">📍</div>
				<h3>¿Quiere usar dirección guardada?</h3>
				<span>{`${direccion.direccion} ${direccion.altura}`}</span>
				<div className="modal-direccion-button-wrapper">
					<button type="button" onClick={handleAcept}>
						Confirmar
					</button>
					<button type="button" onClick={handleDecline}>
						Cancelar
					</button>
				</div>
			</article>
		</div>
	);
};
