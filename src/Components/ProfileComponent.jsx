import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LoadingCartel } from "./UI/LoadingCartel";
import { InfoUser } from "./UI/InfoUser";
import { AddressUser } from "./UI/AddressUser";
import { LogOut } from "lucide-react";

export const ProfileComponent = ({ isMobile = false }) => {
	const { user, isLoading, logout } = useContext(AuthContext);

	if (!user) return null;

	return (
		<div className={`profile-wrapper ${isMobile ? "mobile" : ""}`}>
			{isLoading ? (
				<LoadingCartel />
			) : user ? (
				<div className="profile-content">
					<div className="profile-header">
						<div className="profile-avatar-section">
							<div className="profile-avatar">
								{user.nombre
									.split(" ")
									.map((word) => word[0])
									.join("")
									.toUpperCase()
									.slice(0, 2)}
							</div>
							<div className="profile-welcome">
								<h2 className="profile-greeting">
									¡Hola, {user.nombre.split(" ")[0]}!
								</h2>
								<p className="profile-subtitle">
									Bienvenido a tu cuenta TopDeck
								</p>
							</div>
						</div>

						{!isMobile && (
							<button onClick={logout} className="logout-button-desktop">
								<LogOut size={20} />
								Cerrar Sesión
							</button>
						)}
					</div>

					<div className="profile-grid">
						<InfoUser user={user} isMobile={isMobile} />
						<AddressUser isMobile={isMobile} />
					</div>

					{isMobile && (
						<div className="profile-mobile-actions">
							<button onClick={logout} className="logout-button-mobile">
								<LogOut size={18} />
								Cerrar Sesión
							</button>
						</div>
					)}
				</div>
			) : null}
		</div>
	);
};
