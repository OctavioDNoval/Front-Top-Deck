import { useEffect, useMemo, useState } from "react";
import { useCategorias } from "../Hooks/useCategorias";
import { AdminCategoryCard } from "./UI/AdminCategoryCard";
import { AddCategoryModal } from "./UI/AddCategoryModal";
import { ViewCategoryModal } from "./UI/ViewCategoryModal";
import { useTags } from "../Hooks/useTags";
import { AdminTagCard } from "./UI/AdminTagCard";
import { AddTagModal } from "./UI/AddTagModal";
import { ViewTagModal } from "./UI/ViewTagModal";
import { useMobile } from "../Hooks/useMobile";

export const AdminCategoriaComponent = () => {
	const { categorias, obtenerCategorias } = useCategorias();
	const { tags, obtenerTags } = useTags();
	const { isMobile } = useMobile();

	const [filter, setFilter] = useState("");
	const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
	const [actualizarCategoriaModalOpen, setActualizarCategoriaModalOpen] =
		useState(false);
	const [categoriaSeleccionada, setCategoriaSeleccionada] = useState({});

	const [addTagModalOpen, setAddTagModalOpen] = useState(false);
	const [actualizarTagModalOpen, setActualizarTagModalOpen] = useState(false);
	const [tagSeleccionado, setTagSeleccionado] = useState({});

	useEffect(() => {
		obtenerCategorias();
	}, [addCategoryModalOpen, actualizarCategoriaModalOpen]);

	useEffect(() => {
		obtenerTags();
	}, [addTagModalOpen, actualizarTagModalOpen]);

	const filteredCategoires = useMemo(() => {
		if (!filter) return categorias;

		const searchTerm = filter.toLowerCase();
		return categorias.filter((c) =>
			c.nombre.toLowerCase().includes(searchTerm)
		);
	}, [categorias, filter]);

	const handleClick = (categoria) => {
		console.log("Categoria abierta: ", categoria);
		setActualizarCategoriaModalOpen(true);
		setCategoriaSeleccionada(categoria);
	};

	const handleClickTag = (tag) => {
		console.log("Tag abierto: ", tag);
		setActualizarTagModalOpen(true);
		setTagSeleccionado(tag);
	};

	return (
		<>
			<div className={`admin-buttons-container ${isMobile ? "mobile" : ""}`}>
				<button
					type="button"
					className="admin-btn"
					onClick={() => setAddCategoryModalOpen(true)}
				>
					<i className="icon-plus" style={{ marginRight: "8px" }}>
						+
					</i>
					Agregar Categoría
				</button>

				<button
					type="button"
					className="admin-btn secondary"
					onClick={() => setAddTagModalOpen(true)}
				>
					<i className="icon-plus" style={{ marginRight: "8px" }}>
						+
					</i>
					Agregar Tag
				</button>
				<input
					type="text"
					name="filter"
					placeholder="Buscar"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<div className={`admin-category-tag-wrapper ${isMobile ? "mobile" : ""}`}>
				<section
					className={`admin-category-section ${isMobile ? "mobile" : ""}`}
				>
					<h3>Categorias</h3>
					<div className={`admin-category-wrapper ${isMobile ? "mobile" : ""}`}>
						{filteredCategoires.map((c) => (
							<AdminCategoryCard
								key={c.idCategoria}
								category={c}
								isMobile={isMobile}
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
				<section
					className={`admin-category-section ${isMobile ? "mobile" : ""}`}
				>
					<h3>Tags</h3>
					<div className={`admin-category-wrapper ${isMobile ? "mobile" : ""}`}>
						{tags.map((t) => (
							<AdminCategoryCard
								key={t.idTag}
								category={t}
								isMobile={isMobile}
								onClick={() => handleClickTag(t)}
							/>
						))}
					</div>
					<AddTagModal
						isOpen={addTagModalOpen}
						onClose={() => setAddTagModalOpen(false)}
					/>

					<ViewTagModal
						isOpen={actualizarTagModalOpen}
						onClose={() => setActualizarTagModalOpen(false)}
						tag={tagSeleccionado}
					/>
				</section>
			</div>
		</>
	);
};
