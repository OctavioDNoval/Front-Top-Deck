import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider";

export const LoginForm = ({ onClose }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const { login } = useContext(AuthContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL_BASE}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				}
			);

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message || "error al iniciar sesion");
			}

			const data = await res.json();
			if (data.usuario && data.token) {
				login(data.usuario, data.token);
			}

			onClose();
			navigate("/");

			setEmail("");
			setPassword("");
		} catch (e) {
			setError(e.message);
		}
	};

	return (
		<section className="login-component login-1">
			<div className="login-img-container">
				<img
					src="../../../img/piplup.webp"
					alt="Piplup Login"
					className="login-img"
				/>
			</div>
			<h3 className="form-title">Iniciar Sesion</h3>
			<div className="login-form-container">
				<form className="login-form" onSubmit={handleSubmit}>
					<div className="email-container input-container">
						<label htmlFor="email">Email</label>
						<input
							type="text"
							id="email"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>
					<div className="password-container input-container">
						<label htmlFor="password">Contraseña</label>
						<input
							type="text"
							id="password"
							placeholder="Contraseña"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
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
