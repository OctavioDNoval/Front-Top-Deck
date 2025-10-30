import { useState } from "react";

export const AuthComponent = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<section className="login-signup-conmtainer">
			<div className="close-btn-container">
				<button type="button" onClick={onClose}>
					X
				</button>
			</div>
		</section>
	);
};
