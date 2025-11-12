import { useEffect, useEffectEvent, useState } from "react";
import { storage } from "../../firebase";
import { useTags } from "../../Hooks/useTags";

export const ViewTagModal = ({ isOpen, onClose, tag }) => {
	const [idTag, setIdTag] = useState("");
	const [nombre, setNombre] = useState("");
	const [actualizando, setActualizando] = useState(false);
	const [eliminando, setEliminando] = useState(false);

	const [imagenPreview, setImagenPreview] = useState("");
	const [imagen, setImagen] = useState(null);

	const { actualizarTag, deleteTag } = useTags();

	useEffect(() => {
		if (tag) {
			setIdTag(parseInt(tag.idTag));
			setNombre(tag.nombre);
			setImagenPreview(tag.img_url);
		}
	}, [tag]);

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
			const nombreArchivo = `Tags/${Date.now()}_${file.name}`;
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
		setActualizando(true);
		try {
			let imageUrl = tag.img_url;
			if (imagen) {
				imageUrl = await subirImagenAFirebase(imagen);
			}

			const tagData = {
				nombre: nombre.trim(),
				img_url: imageUrl,
			};

			console.log("Actualizando Tag: ", tagData);

			const tagActualizado = await actualizarTag(tagData, idTag);

			onClose();
			resetForm();
		} catch (e) {
			alert("Error al actualizar el Tag");
			console.log("Error en el componente: ", e);
		} finally {
			setActualizando(false);
		}
	};

	const resetForm = () => {
		setNombre("");
		setImagenPreview("");
	};

	const handleDelete = async (id) => {
		setEliminando(true);
		const confirm = window.confirm("Quiere eliminar este Tag?");
		if (confirm) {
			const res = await deleteTag(id);
			if (!res) {
				alert("No se pudo elimianr el tag");
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
						Modificar Tag
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
								placeholder="Nombre Tag"
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
								onClick={() => handleDelete(idTag)}
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
