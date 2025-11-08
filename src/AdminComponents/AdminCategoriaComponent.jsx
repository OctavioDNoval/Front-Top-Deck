import { useEffect, useMemo, useState } from "react";
import { useCategorias } from "../Hooks/useCategorias";
import { AdminCategoryCard } from "./UI/AdminCategoryCard";
import { AddCategoryModal } from "./UI/AddCategoryModal";
import { ViewCategoryModal } from "./UI/ViewCategoryModal";

export const AdminCategoriaComponent = () => {
	const { categorias, obtenerCategorias } = useCategorias();

	const [filter, setFilter] = useState("");
	const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
	const [actualizarCategoriaModalOpen, setActualizarCategoriaModalOpen] =
		useState(false);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({});

	useEffect(() => {
		obtenerCategorias();
	}, [addCategoryModalOpen, actualizarCategoriaModalOpen]);

	const filteredCategoires = useMemo(() => {
		if (!filter) return categorias;

		const searchTerm = filter.toLowerCase();
		return categorias.filter((c) =>
			c.nombre.toLowerCase().includes(searchTerm)
		);
	}, [categorias, filter]);

	const handleClick = (categoria) => {
		console.log(categoria);
		setActualizarCategoriaModalOpen(true);
		setCategoriaSeleccionada(categoria);
	};

	return (
		<section className="admin-category-section">
			<div className="admin-category-btn-wrapper admin-products-buttons">
				<button type="button" onClick={() => setAddCategoryModalOpen(true)}>
					Agregar categoria
				</button>
				<input
					type="text"
					name="filter"
					placeholder="Buscar"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<div className="admin-category-wrapper">
				{filteredCategoires.map((c) => (
					<AdminCategoryCard
						key={c.idCategoria}
						category={c}
						onClick={() => handleClick(c)}
					/>
				))}

				{filteredCategoires.length === 0 && categorias.length > 0 && (
					<div className="no-result">
						No se encontraron productos con {filter}
					</div>
				)}
			</div>

			<AddCategoryModal
				isOpen={addCategoryModalOpen}
				onClose={() => setAddCategoryModalOpen(false)}
			/>

			<ViewCategoryModal
				isOpen={actualizarCategoriaModalOpen}
				onClose={() => setActualizarCategoriaModalOpen(false)}
				categoria={categoriaSeleccionada}
			/>
		</section>
	);
};
