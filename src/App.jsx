import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { AdminApp } from "./AdminApp";
import { UserApp } from "./UserApp";
import { LoadingScreen } from "./Pages/LoadingScreen";

export const App = () => {
	const { user, isLoading } = useContext(AuthContext);

	if (isLoading) return <LoadingScreen />;

	if (user?.rol === "ADMIN") return <AdminApp />;

	return <UserApp />;
};
