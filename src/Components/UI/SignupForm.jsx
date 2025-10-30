export const SignupForm = () => {
	return (
		<section className="login-component">
			<div className="login-img-container">
				<img
					src="../../../img/pikachu.webp"
					alt="Pikachu Signup"
					className="login-img"
				/>
			</div>
			<h3 className="form-title">Registrate!</h3>
			<div className="signup-form-container">
				<form className="signup-form">
					<div className="email-container input-container">
						<label htmlFor="register-email">Ingresa tu E-Mail</label>
						<input
							type="text"
							id="register-email"
							placeholder="ejemplo@gmail.com"
						/>
					</div>
					<div className="username-container input-container">
						<label htmlFor="register-name">Nombre completo</label>
						<input type="text" id="register-name" placeholder="John Doe" />
					</div>
					<div className="password-container input-container">
						<label htmlFor="register-password">Contraseña</label>
						<input type="text" id="register-password" placeholder="123456789" />
					</div>
					<div className="password-confirm-container input-container">
						<label htmlFor="register-password-confirm">
							Confirmar contraseña
						</label>
						<input
							type="text"
							id="register-password-confirm"
							placeholder="123456789"
						/>
					</div>
					<button type="submit" className="submit-btn">
						Registrarse
					</button>
				</form>
				<div className="error-container"></div>
			</div>
		</section>
	);
};
