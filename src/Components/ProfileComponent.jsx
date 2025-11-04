import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { LoadingCartel } from "./UI/LoadingCartel";

export const ProfileComponent = () => {
	const { user, isLoading, logout } = useContext(AuthContext);

	return (
		<>
			{isLoading ? (
				<LoadingCartel />
			) : user ? (
				<>
					<div>
						<p>{user.nombre}</p>
						<p>{user.email}</p>
						<p>{user.rol}</p>
					</div>
					<button onClick={logout}>Cerrar sesion</button>
				</>
			) : null}
		</>
	);
};
