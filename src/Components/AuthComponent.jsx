import { useContext, useEffect, useState } from "react";
import { LoginForm } from "./UI/LoginForm";
import { SignupForm } from "./UI/SignupForm";
import { AuthContext } from "../AuthProvider";
import { ProfileComponent } from "./ProfileComponent";
import { useMobile } from "../Hooks/useMobile";

export const AuthComponent = ({ isOpen, onClose }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isSigning, setisSigning] = useState(false);

	const { user, isLoading, logout } = useContext(AuthContext);
	const { isMobile } = useMobile();

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

	useEffect(() => {
		if (!isLoading && user) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
		}
	}, [user, isLoading]);

	if (!isOpen) return null;

	return (
		<div className="auth-component-background" onClick={onClose}>
			<section
				className={`login-signup-container ${isMobile ? "mobile" : ""}`}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="close-btn-container" onClick={onClose}>
					<button type="button" className="close-btn">
						X
					</button>
				</div>
				{isAuthenticated ? (
					<div className="profile-container">
						<ProfileComponent isMobile={isMobile} />
					</div>
				) : isMobile ? (
					<div className="mobile-auth-wrapper">
						<div className="mobile-header">
							<div className="topdeck-img-container">
								<img src="../../img/LogoOnly2.webp" alt="TopDeck Logo" />
							</div>
							<div className="mobile-tabs">
								<button
									className={`tab-btn ${!isSigning ? "active" : ""}`}
									onClick={() => setisSigning(false)}
								>
									Iniciar Sesión
								</button>
								<button
									className={`tab-btn ${isSigning ? "active" : ""}`}
									onClick={() => setisSigning(true)}
								>
									Registrarse
								</button>
							</div>
						</div>

						<div className="mobile-form-container">
							{isSigning ? (
								<SignupForm onClose={onClose} isMobile={isMobile} />
							) : (
								<LoginForm onClose={onClose} isMobile={isMobile} />
							)}

							<div className="mobile-switch-text">
								<p>
									{isSigning ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
									<span onClick={() => setisSigning(!isSigning)}>
										{isSigning ? " Inicia Sesión" : " Crea una"}
									</span>
								</p>
							</div>
						</div>
					</div>
				) : (
					<div className="login-signup-wrapper">
						<div className="login-container auth-container">
							<LoginForm onClose={onClose} />
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
