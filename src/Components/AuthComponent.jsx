import { useEffect, useState } from "react";
import { LoginForm } from "./UI/LoginForm";
import { SignupForm } from "./UI/SignupForm";

export const AuthComponent = ({ isOpen, onClose }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isSigning, setisSigning] = useState(false);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		return () => {
			document.body.style.overflow = "auto";
			setisSigning(false);
		};
	}, [isOpen]);

	if (!isOpen) return null;

	return (
		<div className="auth-component-background" onClick={onClose}>
			<section
				className="login-signup-conmtainer"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="close-btn-container" onClick={onClose}>
					<button type="button" className="close-btn">
						X
					</button>
				</div>
				{isAuthenticated ? (
					<div className="profile-container"></div>
				) : (
					<div className="login-signup-wrapper">
						<div className="login-container auth-container">
							<LoginForm />
						</div>
						<div className="signup-container auth-container">
							<SignupForm onClose={onClose} />
						</div>
						<div className={`top-wrapper ${isSigning ? "signup" : "login"}`}>
							<div className="topdeck-img-container">
								<img src="../../img/LogoOnly2.webp" alt="TopDeck Logo" />
							</div>
							<div className="create-account-text-container">
								<p>{isSigning ? "Ya tienes cuenta?" : "No tienes cuenta?"}</p>
								<p
									className="create-account-text"
									onClick={() => setisSigning(!isSigning)}
								>
									{isSigning ? "Inicia Sesion" : "Crea una"}
								</p>
							</div>
						</div>
					</div>
				)}
			</section>
		</div>
	);
};
