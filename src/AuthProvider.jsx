import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const controller = new AbortController();

		const token = localStorage.getItem("token");
		const usuario = localStorage.getItem("user");
		if (token && usuario) {
			fetch(`${import.meta.env.VITE_API_URL_BASE}/auth/validate/start`, {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((res) => {
					if (!res.ok) throw new Error("token invalido");
					setToken(token);
					setUser(JSON.parse(usuario));
				})
				.catch(() => {
					logout();
				})
				.finally(() => setIsLoading(false));
		} else {
			setIsLoading(false);
		}

		return () => controller.abort();
	}, []);

	const login = (userData, tokenData) => {
		setUser(userData);
		setToken(tokenData);
		localStorage.setItem("token", tokenData);
		localStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = () => {
		setUser(null);
		setToken(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	};

	return (
		<AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
			{children}
		</AuthContext.Provider>
	);
};
