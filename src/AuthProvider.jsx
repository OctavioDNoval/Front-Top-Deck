import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [carrito, setCarrito] = useState(null);
	const [isFetching, setIsFetching] = useState(false);

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

	useEffect(() => {
		if (isLoading || !user) return;

		const controller = new AbortController();
		const fetchData = async () => {
			setIsFetching(true);
			try {
				const res = await fetch(
					`${import.meta.env.VITE_API_URL_BASE}/carrito/usuario/${
						user.id_usuario
					}`,
					{ signal: controller.signal }
				);
				if (!res.ok) {
					const errData = await res.json();
					throw new Error(errData.message);
				}
				const cart = await res.json();
				setCarrito(cart);
			} catch (e) {
				console.log(e);
			} finally {
				setIsFetching(false);
			}
		};

		fetchData();

		return () => controller.abort();
	}, [user]);

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
		<AuthContext.Provider
			value={{ user, token, login, logout, isLoading, carrito, isFetching }}
		>
			{children}
		</AuthContext.Provider>
	);
};
