import { useEffect, useMemo, useState } from "react";
import { useProductos } from "../Hooks/useProductos";
import { AdminProduct } from "./UI/AdminProduct";
import { AddProductModal } from "./UI/AddProductModal";
import { ViewProductModal } from "./UI/ViewProductModal";
import { useMobile } from "../Hooks/useMobile";

export const ProductosAdminComponent = () => {
	const { productos, isLoading, error, obtenerProductos } = useProductos();

	const [addProductModalOpen, setAddProductModalOpen] = useState(false);
	const [filter, setFilter] = useState("");
	const [viewProductModalOpen, setViewProductModalOpen] = useState(false);
	const [productSelected, setProductSelected] = useState({});
	console.log(productos);

	const { isMobile } = useMobile();

	useEffect(() => {
		obtenerProductos();
	}, [addProductModalOpen, viewProductModalOpen]);

	const filteredProducts = useMemo(() => {
		if (!filter) return productos;

		const searchTerm = filter.toLowerCase();
		return productos.filter(
			(producto) =>
				producto.nombre.toLowerCase().includes(searchTerm) ||
				producto.categoria.nombre.toLowerCase().includes(searchTerm)
		);
	}, [productos, filter]);

	const handleProductClick = (product) => {
		console.log(product);
		setViewProductModalOpen(true);
		setProductSelected(product);
	};

	return (
		<div className={`admin-product-wrapper ${isMobile ? "mobile" : ""}`}>
			<div className="admin-buttons-container">
				<button
					onClick={() => setAddProductModalOpen(true)}
					className="admin-btn"
				>
					Agregar Producto
				</button>
				<input
					type="text"
					name="filter"
					placeholder="Buscar"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<article
				className={`admin-product-container ${isMobile ? "mobile" : ""}`}
			>
				<div className="admin-product-header">
					<div>Nombre</div>
					<div>Precio</div>
					<div>Categoria</div>
					<div>Stock</div>
				</div>
				{filteredProducts.map((p) => (
					<AdminProduct
						key={p.productoId}
						product={p}
						isMobile={isMobile}
						onClick={() => handleProductClick(p)}
					/>
				))}

				{filteredProducts.length === 0 && productos.length > 0 && (
					<div className="no-result">
						No se encontraron productos con {filter}
					</div>
				)}
			</article>
			<AddProductModal
				isOpen={addProductModalOpen}
				onClose={() => setAddProductModalOpen(false)}
			/>

			<ViewProductModal
				isOpen={viewProductModalOpen}
				onClose={() => {
					setViewProductModalOpen(false);
					setProductSelected({});
				}}
				product={productSelected}
			/>
		</div>
	);
};
