import { Trash2 } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider";

export const CarritoCard = ({ detalleCarrito, onDelete }) => {
	console.log("detalle carrito: ", detalleCarrito);

	const apiUrl = import.meta.env.VITE_API_URL_BASE;

	const { token } = useContext(AuthContext);

	const handleDelete = async () => {
		try {
			const res = await fetch(
				`${apiUrl}/carrito/user/detalle/${detalleCarrito.id_DetalleCarrito}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (res.status === 204) {
				console.log("✅ Producto eliminado correctamente");
				onDelete();
			} else if (res.status === 404) {
				console.warn("⚠️ Producto no encontrado");
			} else {
				console.error("❌ Error al eliminar producto:", res.status);
			}
		} catch (e) {
			console.log("error ", e);
		}
	};

	return (
		<article className="carrito-card">
			<div className="carrito-card-img-container">
				<img
					src={detalleCarrito.productoDTO.img_url}
					alt={detalleCarrito.productoDTO.nombre}
					className="carrito-card-img"
				/>
			</div>
			<div className="carrito-card-product-info">
				<h4>{detalleCarrito.productoDTO.nombre}</h4>
				<div className="carrito-card-price-container">
					<p>
						${detalleCarrito.productoDTO.precio} x {detalleCarrito.cantidad}
					</p>
				</div>
			</div>
			<button className="delete-carrito-card" onClick={handleDelete}>
				<Trash2 />
			</button>
		</article>
	);
};
