export const LoginForm = () => {
	return (
		<section className="login-component">
			<div className="login-img-container">
				<img
					src="../../../img/piplup.webp"
					alt="Piplup Login"
					className="login-img"
				/>
			</div>
			<h3 className="form-title">Iniciar Sesion</h3>
			<div className="login-form-container">
				<form className="login-form">
					<div className="email-container input-container">
						<label htmlFor="email">Email</label>
						<input type="text" id="email" placeholder="Email" />
					</div>
					<div className="password-container input-container">
						<label htmlFor="password">Contraseña</label>
						<input type="text" id="password" placeholder="Contraseña" />
					</div>
					<button type="submit" className="submit-btn">
						Ingresar
					</button>
				</form>
				<div className="error-container"></div>
			</div>
		</section>
	);
};
