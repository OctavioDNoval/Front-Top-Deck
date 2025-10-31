import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";

export const SignupForm = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [nombre, setNombre] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");

	const apiUrl = import.meta.env.VITE_API_URL_BASE;

	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (password != passwordConfirm) {
			setError("Las contraseñas no coinciden ");
			return;
		}

		try {
			const res = await fetch(`${apiUrl}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					nombre,
					password,
					email,
				}),
			});

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message || "error al registrarse");
			}

			const data = await res.json();

			if (data.usuario && data.token) {
				login(data.usuario, data.token);
			}

			onClose();
			navigate("/");

			setEmail("");
			setNombre("");
			setPassword("");
			setPasswordConfirm("");
		} catch (e) {
			setError(e.message);
		}
	};

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
			<div className="login-form-container">
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="email-container input-container">
						<label htmlFor="register-email">Ingresa tu E-Mail</label>
						<input
							type="text"
							id="register-email"
							placeholder="ejemplo@gmail.com"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="username-container input-container">
						<label htmlFor="register-name">Nombre completo</label>
						<input
							type="text"
							id="register-name"
							placeholder="John Doe"
							value={nombre}
							onChange={(e) => setNombre(e.target.value)}
							required
						/>
					</div>
					<div className="password-container input-container">
						<label htmlFor="register-password">Contraseña</label>
						<input
							type="text"
							id="register-password"
							placeholder="123456789"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>
					<div className="password-confirm-container input-container">
						<label htmlFor="register-password-confirm">
							Confirmar contraseña
						</label>
						<input
							type="text"
							id="register-password-confirm"
							placeholder="123456789"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
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
