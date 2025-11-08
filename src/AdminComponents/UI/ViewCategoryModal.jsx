import { useEffect, useState } from "react";
import { useCategorias } from "../../Hooks/useCategorias";

export const ViewCategoryModal = ({ isOpen, onClose, categoria }) => {
	const [nombre, setNombre] = useState("");
	const [id, setId] = useState(0);
	const [actualizando, setActualizando] = useState(false);
	const [eliminando, setEliminando] = useState(false);

	const { actualizarCategoria, eliminarCategoria } = useCategorias();

	useEffect(() => {
		setNombre(categoria.nombre);
		setId(categoria.idCategoria);
		return () => resetForm();
	}, [categoria]);

	const resetForm = () => {
		setNombre("");
		setId(0);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setActualizando(true);

		try {
			const categoriaNueva = {
				nombre,
			};

			const categoriaActualizada = await actualizarCategoria(
				id,
				categoriaNueva
			);

			onClose();
			resetForm();
			return categoriaActualizada;
		} catch (e) {
			alert("Error al actualizar la categoria");
		} finally {
			setActualizando(false);
		}
	};

	const handleDelete = async (id) => {
		setEliminando(true);
		const confirm = window.confirm("Quiere eliminar esta categoria?");
		if (confirm) {
			const res = await eliminarCategoria(id);
			if (!res) {
				alert("No se pudo eliminar categoria");
			} else {
				onClose();
				resetForm();
			}
		}
		setEliminando(false);
	};

	if (!isOpen) return null;

	return (
		<article className="add-product-modal">
			<div>
				<div>
					<h2>
						Modificar Categoria
						<button
							type="button"
							onClick={() => {
								onClose();
								resetForm();
							}}
						>
							X
						</button>
					</h2>
				</div>
				<div className="add-product-form">
					<form method="post" onSubmit={handleSubmit}>
						<div className="add-product-input">
							<label htmlFor="product-name">Nombre</label>
							<input
								type="text"
								placeholder="Nombre Categoria"
								id="product-name"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
						</div>

						<div className="buttons-wrapper">
							<button type="submit" disabled={actualizando}>
								{actualizando ? "Actualizando..." : "Actualizar"}
							</button>
							<button
								className="x"
								type="button"
								disabled={eliminando}
								onClick={() => handleDelete(id)}
							>
								{eliminando ? "Eliminando" : "Eliminar"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</article>
	);
};
