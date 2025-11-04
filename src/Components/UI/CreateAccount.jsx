export const CreateAccount = ({ onClose, authOpen }) => {
	const handleClick = (e) => {
		e.preventDefault();
		onClose();

		authOpen();
	};

	return (
		<article className="create-account-advice">
			<img
				src="../../../img/LogoOnly2.webp"
				alt="TopDeckLogo"
				className="create-account-advice-logo"
			/>

			<div className="create-account-advice-text">
				<h3>Crea una cuenta!</h3>
				<h5>Asi podras agregar productos</h5>
			</div>
			<button onClick={handleClick}>Crear Ahora</button>
		</article>
	);
};
