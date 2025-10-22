export const ErrorCartel = ({ message }) => {
	return (
		<div className="loading-container">
			<div className="loading-img-container">
				<img
					src="../../../img/PikachuTriste.webp"
					alt="Error"
					className="error-img"
				/>
			</div>
			<h3 className="error">{message}</h3>
		</div>
	);
};
