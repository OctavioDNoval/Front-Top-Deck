import { useState } from "react";
import { useProductos } from "../Hooks/useProductos";
import { AdminProduct } from "./UI/AdminProduct";
import { AddProductModal } from "./UI/AddProductModal";

export const ProductosAdminComponent = () => {
	const { productos, isLoading, error, obtenerProductos, agregarProductos } =
		useProductos();

	const [addProductModalOpen, setAddProductModalOpen] = useState(false);

	return (
		<div className="admin-product-wrapper">
			<button onClick={() => setAddProductModalOpen(true)} className="add">
				Agregar Producto
			</button>
			<AddProductModal
				isOpen={addProductModalOpen}
				onClose={() => setAddProductModalOpen(false)}
			/>
			<article className="admin-product-container">
				<div className="admin-product-header">
					<div>Nombre</div>
					<div>Precio</div>
					<div>Categoria</div>
					<div>Stock</div>
				</div>
				{productos.map((p) => (
					<AdminProduct product={p} />
				))}
			</article>
		</div>
	);
};
