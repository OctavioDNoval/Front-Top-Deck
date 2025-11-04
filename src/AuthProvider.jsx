import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [carrito, setCarrito] = useState(null);
	const [isFetching, setIsFetching] = useState(false);
	const [carritoProductos, setCarritoProductos] = useState([]);

	const apiUrl = import.meta.env.VITE_API_URL_BASE;

	const navigate = useNavigate();

	const fetchCarritoDetalles = async (idCarrito) => {
		if (!idCarrito || !token) return;

		try {
			const res = await fetch(`${apiUrl}/carrito/user/${idCarrito}/detalles`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			if (!res.ok) {
				const text = await res.text();
				const errData = text ? JSON.parse(text) : { message: res.statusText };
				console.log(errData);
				throw new Error(errData);
			}

			const text = await res.text();
			const data = text ? JSON.parse(text) : [];
			setCarritoProductos(data);
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

	const agregarAlCarrito = async (cantidad, idProducto) => {
		try {
			const res = await fetch(
				`${apiUrl}/carrito/user/${carrito.idCarrito}/save?idProducto=${idProducto}&cantidad=${cantidad}`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
				}
			);

			console.log(res);

			if (!res.ok) {
				const errData = await res.json();
				throw new Error(errData.message);
			}

			if (res.status === 201) {
				await fetchCarritoDetalles(carrito.idCarrito);
				return true;
			}
			return false;
		} catch (e) {
			setErrorMsg(e.message);
		}
	};

	const eliminarProductoDelCarrito = async (id_DetalleCarrito) => {
		try {
			const res = await fetch(
				`${apiUrl}/carrito/user/detalle/${id_DetalleCarrito}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.status === 204) {
				console.log("✅ Producto eliminado correctamente");
				setCarritoProductos((prev) =>
					prev.filter((p) => p.id_DetalleCarrito != id_DetalleCarrito)
				);
				return true;
			} else if (res.status === 404) {
				console.warn("⚠️ Producto no encontrado");
				return false;
			} else {
				console.error("❌ Error al eliminar producto:", res.status);
				return false;
			}
		} catch (e) {
			console.log("error ", e);
		}
	};

	const actualizarCarrito = async () => {
		if (carrito) {
			await fetchCarritoDetalles(carrito.idCarrito);
		}
	};

	useEffect(() => {
		const controller = new AbortController();

		const token = localStorage.getItem("token");
		const usuario = localStorage.getItem("user");
		if (token && usuario) {
			fetch(`${apiUrl}/auth/validate/start`, {
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
					{
						headers: { Authorization: `Bearer ${token}` },
						signal: controller.signal,
					}
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
		navigate("/");
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				login,
				logout,
				isLoading,
				carrito,
				isFetching,
				fetchCarritoDetalles,
				agregarAlCarrito,
				eliminarProductoDelCarrito,
				actualizarCarrito,
				carritoProductos,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
