import { useState } from "react";
import { storage } from "../../firebase";
import { useTags } from "../../Hooks/useTags";

export const AddTagModal = ({ isOpen, onClose }) => {
	const [nombre, setNombre] = useState("");
	const [subiendo, setSubiendo] = useState(false);
	const [imagen, setImagen] = useState(null);
	const [imagenPreview, setImagenPreview] = useState("");

	const { agregarTag } = useTags();

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

		if (!nombre) {
			alert("Completa los campos obligatorios");
			return;
		}

		setSubiendo(true);
		try {
			let imagenUrl = "";
			if (imagen) {
				imagenUrl = await subirImagenAFirebase(imagen);
			}

			const tagData = {
				nombre: nombre.trim(),
				img_url: imagenUrl,
			};

			const tagGuardado = await agregarTag(tagData);

			onClose();
			resetData();
		} catch (e) {
			console.error("Error al cargar el tag");
			throw e;
		} finally {
			setSubiendo(true);
		}
	};

	const resetData = () => {
		setNombre("");
		setImagen(null);
		setImagenPreview("");
	};

	if (!isOpen) return null;

	return (
		<article className="add-product-modal">
			<div>
				<div>
					<h2>
						Agregar Tag
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
							<label htmlFor="product-image">Imagen del Tag</label>
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

						<button type="submit" disabled={subiendo}>
							{subiendo ? "Subiendo..." : "Agregar"}
						</button>
					</form>
				</div>
			</div>
		</article>
	);
};
