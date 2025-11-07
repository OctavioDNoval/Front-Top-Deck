import { useEffect, useState } from "react";
import { useCategorias } from "../../Hooks/useCategorias";
import { storage } from "../../firebase";
import { useProductos } from "../../Hooks/useProductos";
import { setLogLevel } from "firebase/app";
import { EliminadoModal } from "./EliminadoModal";

export const ViewProductModal = ({ isOpen, onClose, product }) => {
	console.log(product);

	const [productoId, setProductoId] = useState("");
	const [nombre, setNombre] = useState("");
	const [precio, setPrecio] = useState("");
	const [stock, setStock] = useState("");
	const [categoriaId, setCategoriaId] = useState("");
	const [descripcion, setDescripcion] = useState("");
	const [imagen, setImagen] = useState(null);
	const [imagenPreview, setImagenPreview] = useState("");
	const [actualizando, setActualizando] = useState(false);
	const [eliminando, setEliminando] = useState(false);
	const [eliminadoModal, setEliminadoModal] = useState(false);

	const { categorias, isLoading, error, obtenerCategorias } = useCategorias();
	const { actualizarProducto, eliminarProducto } = useProductos();

	useEffect(() => {
		if (product && product.nombre) {
			setProductoId(product.productoId || "");
			setNombre(product.nombre || "");
			setPrecio(product.precio || "");
			setStock(product.stock || "");
			setDescripcion(product.descripcion || "");
			setImagenPreview(product.img_url || "");

			if (product.categoria && product.categoria.idCategoria) {
				setCategoriaId(product.categoria.idCategoria);
			} else if (product.id_categoria) {
				setCategoriaId(product.id_categoria);
			} else {
				setCategoriaId("");
			}
		}
	}, [product]);

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

	const resetData = () => {
		setProductoId("");
		setNombre("");
		setPrecio("");
		setStock("");
		setDescripcion("");
		setCategoriaId("");
		setImagen(null);
		setImagenPreview("");
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		setActualizando(true);

		try {
			let imageUrl = product.img_url;
			if (imagen) {
				imageUrl = await subirImagenAFirebase(imagen);
			}

			const categoriaSeleccionada = categorias.find(
				(c) => c.idCategoria === parseInt(categoriaId)
			);

			const productData = {
				nombre: nombre.trim(),
				descripcion: descripcion.trim(),
				precio: parseFloat(precio) || 1,
				stock: parseInt(stock) || 0,
				categoria: categoriaSeleccionada,
				img_url: imageUrl,
			};

			console.log("Actualizando produto: ", productData);

			const productoActualizado = await actualizarProducto(
				productoId,
				productData
			);

			onClose();
			resetData();
			return productoActualizado;
		} catch (e) {
			console.error("Error: ", e.message);
			alert("Error al actualizar el producto", e);
		} finally {
			setActualizando(false);
		}
	};

	const handleDelete = async (id) => {
		setEliminando(true);
		const confirm = window.confirm("quiere elimianr este producto?");
		if (confirm) {
			const res = await eliminarProducto(id);

			if (res) {
				setEliminadoModal(true);
				setTimeout(() => {
					setEliminadoModal(false);
					onClose();
					resetData();
				}, 2000);
			} else {
				alert("No se pudo eliminar el producto");
			}
		}
		setEliminando(false);
	};

	if (!isOpen) return;

	return (
		<>
			<article className="add-product-modal">
				<div>
					<div>
						<h2>
							Editar Producto
							<button
								type="button"
								onClick={() => {
									onClose();
									resetData();
								}}
							>
								X
							</button>
						</h2>
					</div>
					<div className="add-product-form">
						<form method="post" onSubmit={handleUpdate}>
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
									<option value="">Seleccionar...</option>
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
									value={descripcion}
									onChange={(e) => setDescripcion(e.target.value)}
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
									onClick={() => handleDelete(productoId)}
								>
									{eliminando ? "Eliminando" : "Eliminar"}
								</button>
							</div>
						</form>
					</div>
				</div>
				<EliminadoModal isOpen={eliminadoModal} />
			</article>
		</>
	);
};
