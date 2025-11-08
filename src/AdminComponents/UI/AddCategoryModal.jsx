import { useState } from "react";
import { useCategorias } from "../../Hooks/useCategorias";

export const AddCategoryModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState("");
	const [subiendo, setSubiendo] = useState(false);

	const { agregarCategoria } = useCategorias();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nombre) {
			alert("Completa los campos obligatorios");
			return;
		}

		setSubiendo(true);

		try {
			const categoriaGuardada = await agregarCategoria(nombre);
			onClose();
			resetForm();
		} catch (e) {
			throw new Error(e.message);
		} finally {
			setSubiendo(false);
		}
	};

	const resetForm = () => {
		setNombre("");
	};

	if (!isOpen) return null;

	return (
		<article className="add-product-modal">
			<div>
				<div>
					<h2>
						Agregar Categoria
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

						<button type="submit" disabled={subiendo}>
							{subiendo ? "Subiendo..." : "Agregar"}
						</button>
					</form>
				</div>
			</div>
		</article>
	);
};
