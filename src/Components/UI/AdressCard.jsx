export const AdressCard = (direccion) => {
	return (
		<div className=" adress-card">
			<span>
				{direccion.direccion} {direccion.altura}
			</span>
			<button>Seleccionar</button>
		</div>
	);
};
