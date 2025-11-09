import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LoadingCartel } from "./UI/LoadingCartel";
import { InfoUser } from "./UI/InfoUser";
import { AddressUser } from "./UI/AddressUser";

export const ProfileComponent = () => {
	const { user, isLoading, logout } = useContext(AuthContext);

	if (!user) return null;

	return (
		<div className="profile-container">
			{isLoading ? (
				<LoadingCartel />
			) : user ? (
				<div className="profile-info-wrapper">
					<InfoUser />
					<AddressUser />
					<div className="logout-button-container">
						<button onClick={logout} className="logout-button">
							Cerrar Sesión
						</button>
					</div>
				</div>
			) : null}
		</div>
	);
};
