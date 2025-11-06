import { useState } from "react";
import { useCategorias } from "../../Hooks/useCategorias";
import { useProductos } from "../../Hooks/useProductos";
import { storage } from "../../firebase";

export const AddProductModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState("");
	const [precio, setPrecio] = useState(0);
	const [stock, setStock] = useState(0);
	const [categoriaId, setCategoriaId] = useState(0);
	const [desc, setDesc] = useState("");
	const [imagen, setImagen] = useState(null);
	const [imagenPreview, setImagenPreview] = useState("");
	const [subiendo, setSubiendo] = useState(false);

	const { categorias, isLoading, error, obtenerCategorias } = useCategorias();
	const { agregarProducto } = useProductos();

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setImagen(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagenPreview(reader.result);
			};
			reader.readAsDataURL(file);
		}
	};

	const subirImagenAFirebase = async (file) => {
		const { ref, uploadBytes, getDownloadURL } = await import(
			"firebase/storage"
		);
		try {
			const nombreArchivo = `productos/${Date.now()}_${file.name}`;
			const storageRef = ref(storage, nombreArchivo);

			const snapshot = await uploadBytes(storageRef, file);

			const downloadURL = await getDownloadURL(snapshot.ref);
			return downloadURL;
		} catch (e) {
			console.log("Error subiendo la imagen", e);
			throw e;
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!nombre || !precio || !categoriaId) {
			alert("Completa los campos obligatorios");
			return;
		}

		setSubiendo(true);

		try {
			let imagenUrl = "";
			if (imagen) {
				imagenUrl = await subirImagenAFirebase(imagen);
			}

			const productData = {
				nombre,
				desc,
				precio: parseFloat(precio),
				stock: parseInt(stock),
				id_categoria: parseInt(categoriaId),
				img_url: imagenUrl,
			};

			const productoGuardado = await agregarProducto(productData);
			console.log("Producto guardado: ", productoGuardado);

			onClose();
			resetForm();
		} catch (e) {
			console.error("Error al agregar al producto: ", e);
			alert("Error al agregar al producto: ", e);
		} finally {
			setSubiendo(false);
		}
	};

	const resetForm = () => {
		setNombre("");
		setPrecio(0);
		setStock(0);
		setDesc("");
		setCategoriaId(0);
		setImagen(null);
		setImagenPreview("");
	};

	if (!isOpen) return;

	return (
		<article className="add-product-modal">
			<div>
				<div>
					<h2>
						Agregar Producto
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
							<label htmlFor="product-image">Imagen del Producto</label>
							<input
								type="file"
								id="product-image"
								accept="image/*"
								onChange={handleImageChange}
							/>
							{imagenPreview && (
								<div className="image-preview">
									<img src={imagenPreview} alt="Vista previa" />
								</div>
							)}
						</div>

						<div className="add-product-input">
							<label htmlFor="product-name">Nombre</label>
							<input
								type="text"
								placeholder="Nombre Producto"
								id="product-name"
								value={nombre}
								onChange={(e) => setNombre(e.target.value)}
							/>
						</div>

						<div className="add-product-input">
							<label htmlFor="product-price">Precio</label>
							<input
								type="number"
								placeholder="Precio Producto"
								id="product-price"
								value={precio}
								onChange={(e) => setPrecio(e.target.value)}
							/>
						</div>

						<div className="add-product-input">
							<label htmlFor="product-stock">Stock</label>
							<input
								type="number"
								placeholder="Stock Producto"
								id="product-stock"
								value={stock}
								onChange={(e) => setStock(e.target.value)}
							/>
						</div>

						<div className="add-product-input">
							<label htmlFor="product-category">Categoria</label>
							<select
								name="Categoria"
								id="product-category"
								value={categoriaId}
								onChange={(e) => setCategoriaId(e.target.value)}
							>
								<option value="0">Seleccionar...</option>
								{categorias.map((c) => (
									<option value={c.idCategoria} key={c.idCategoria}>
										{c.nombre}
									</option>
								))}
							</select>
						</div>

						<div className="add-product-input">
							<label htmlFor="product-desc">Descripcion</label>
							<textarea
								id="product-desc"
								rows="5"
								placeholder="Aca va la descripcion del producto"
								value={desc}
								onChange={(e) => setDesc(e.target.value)}
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
