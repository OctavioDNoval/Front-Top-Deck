import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { CarritoCard } from "../Components/UI/CarritoCard";
import { CarritoEfimeroContext } from "../CarritoEfimeroProvider";
import { useFormatNum } from "../Hooks/useFormatNum";
import { useUsuarios } from "../Hooks/useUsuarios";
import { useDireccion } from "../Hooks/useDireccion";
import { useWhatsApp } from "../Hooks/useWhatsApp";
import { Plus } from "lucide-react";
import { AdressCard } from "../Components/UI/AdressCard";
import { AddDirectionModal } from "../Components/UI/AddDirectionModal";

export const PedidoPage = () => {
	const { user } = useContext(AuthContext);
	const [provincias, setProvincias] = useState([]);

	const [nombre, setNombre] = useState("");
	const [email, setEmail] = useState("");

	const [provincia, setProvincia] = useState("");
	const [ciudad, setCiudad] = useState("");
	const [codigoPostal, setCodigoPostal] = useState("");
	const [calle, setCalle] = useState("");
	const [altura, setAltura] = useState("");
	const [piso, setPiso] = useState("");

	const [subtotal, setSubtotal] = useState(0);

	const [addDirectionModalOpen, setAddDirectionModalOpen] = useState(false);

	const { formatPrice } = useFormatNum();
	const { agregarUsuarioSinContrasenia } = useUsuarios();
	const { agregarDireccionSinUsuario } = useDireccion();
	const { enviarWhatsApp } = useWhatsApp();
	const { direcciones, traerDireccionesDeUnUsuario } = useDireccion();

	const { carritoEfimero, totalCarrito } = useContext(CarritoEfimeroContext);
	const { carritoProductos } = useContext(AuthContext);

	const normalizarItemCarrito = (item) => {
		return {
			productoDTO: {
				idProducto: item.producto.idProducto,
				nombre: item.producto.nombre,
				precio: item.producto.precio,
				img_url: item.producto.img_url,
			},
			cantidad: item.cantidad,
		};
	};

	/*UseEffect para traer las provincias del pais desde
	 * la base de datos del gobierno
	 */
	useEffect(() => {
		const obtenerProvincias = async () => {
			try {
				const res = await fetch(
					"https://apis.datos.gob.ar/georef/api/provincias"
				);
				if (!res.ok) {
					throw new Error("Error al traer las provincias");
				}

				const data = await res.json();
				if (data.provincias && Array.isArray(data.provincias)) {
					setProvincias(data.provincias);
				} else {
					throw new Error("Formato de respuesta inesperado");
				}
			} catch (e) {
				console.log(e);
			}
		};
		obtenerProvincias();
	}, []);

	useEffect(() => {
		if (user) {
			traerDireccionesDeUnUsuario();
		}
	}, []);

	useEffect(() => {
		let total = 0;
		carritoProductos.forEach((item) => {
			total += item.productoDTO.precio * item.cantidad;
		});
		setSubtotal(total);
	}, [carritoProductos]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const usuario = {
				nombreCompleto: nombre.trim(),
				email: email.trim(),
			};

			const usuarioAgregado = await subirUsuarioSinContrasenia(usuario);

			const direccion = {
				id_usuario: usuarioAgregado.idUsuario,
				provincia: provincia.trim() || "",
				pais: "Argentina",
				ciudad: ciudad.trim() || "",
				codigo_postal: codigoPostal.trim(),
				direccion: calle.trim() || "",
				altura: altura.trim(),
				piso: piso.trim() || "",
			};

			const direccionAgregada = await subirDireccionSinUsuarioLogueado(
				direccion
			);

			if (!usuarioAgregado && !direccionAgregada) {
				throw new Error(
					"No se pudieron obtener los datos del usuario o dirección"
				);
			}

			console.log("Usuario", usuarioAgregado);
			console.log("Direccion", direccionAgregada);

			enviarWhatsApp(usuarioAgregado, direccionAgregada);
		} catch (e) {
			console.error(e);
		}
	};

	const subirDireccionSinUsuarioLogueado = async (direccion) => {
		try {
			const res = await agregarDireccionSinUsuario(direccion);
			return res;
		} catch (e) {
			console.error(e);
		}
	};

	const subirUsuarioSinContrasenia = async (usuario) => {
		try {
			const res = await agregarUsuarioSinContrasenia(usuario);
			return res;
		} catch (e) {
			console.error("Problemas al realziar el pedido");
		}
	};

	const handleAddDirection = () => {
		setAddDirectionModalOpen(true);
	};

	return (
		<section className="pedido-page">
			<div className="pedido-container">
				{user ? (
					<div className="confirm-pedido-container">
						<div className="direcciones-header">
							<h2 className="direcciones-title">
								Selecciona una dirección de envío
							</h2>
							<p className="direcciones-subtitle">
								Elige una de tus direcciones guardadas o agrega una nueva
							</p>
							{direcciones.length === 0 ? (
								<span>No hay direcciones guardadas</span>
							) : null}
						</div>
						<div className="confirm-pedido-container">
							<div className="direcciones-container-grid">
								{direcciones?.map((d) => {
									return <AdressCard direccion={d} />;
								})}
								<div
									className="add-adress-card adress-card"
									onClick={handleAddDirection}
								>
									<span>Agregar direccion</span>
									<Plus />
								</div>
							</div>
							<div className="form-actions">
								<button type="submit" className="submit-btn">
									Confirmar pedido
								</button>
							</div>
						</div>
						<AddDirectionModal
							isOpen={addDirectionModalOpen}
							onClose={() => setAddDirectionModalOpen(false)}
						/>
					</div>
				) : (
					<div className="pedido-form-container">
						<div className="form-header">
							<h2 className="form-title">Información de Envío</h2>
							<p className="form-subtitle">
								Completa tus datos para finalizar la compra
							</p>
						</div>

						<form className="pedido-form" onSubmit={handleSubmit}>
							{/* Información Personal */}
							<div className="form-section">
								<h3 className="section-title">Datos Personales</h3>
								<div className="input-group">
									<div className="input-field">
										<label htmlFor="usuario-nombre" className="input-label">
											Nombre Completo
										</label>
										<input
											type="text"
											name="usuario-nombre"
											id="usuario-nombre"
											className="form-input"
											placeholder="Ingresa tu nombre completo"
											value={nombre}
											onChange={(e) => setNombre(e.target.value)}
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-email" className="input-label">
											Email
										</label>
										<input
											type="email"
											name="usuario-email"
											id="usuario-email"
											className="form-input"
											placeholder="ejemplo@email.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
										/>
									</div>
								</div>
							</div>

							{/* Dirección */}
							<div className="form-section">
								<h3 className="section-title">Dirección de Envío</h3>
								<div className="input-grid">
									<div className="input-field">
										<label htmlFor="usuario-pais" className="input-label">
											País
										</label>
										<input
											type="text"
											value="Argentina"
											disabled
											className="form-input disabled"
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-provincia" className="input-label">
											Provincia
										</label>
										<select
											name="usuario-provincia"
											id="usuario-provincia"
											className="form-select"
											value={provincia}
											onChange={(e) => setProvincia(e.target.value)}
										>
											<option value="">Selecciona una provincia</option>
											{provincias.map((p) => (
												<option key={p.id} value={p.nombre}>
													{p.nombre}
												</option>
											))}
										</select>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-ciudad" className="input-label">
											Ciudad
										</label>
										<input
											type="text"
											name="usuario-ciudad"
											id="usuario-ciudad"
											className="form-input"
											placeholder="Tu ciudad"
											value={ciudad}
											onChange={(e) => setCiudad(e.target.value)}
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-codigo" className="input-label">
											Código Postal
										</label>
										<input
											type="text"
											name="usuario-codigo"
											id="usuario-codigo"
											className="form-input"
											placeholder="Ej: 1425"
											value={codigoPostal}
											onChange={(e) => setCodigoPostal(e.target.value)}
										/>
									</div>
									<div className="input-field full-width">
										<label htmlFor="usuario-calle" className="input-label">
											Calle
										</label>
										<input
											type="text"
											name="usuario-calle"
											id="usuario-calle"
											className="form-input"
											placeholder="Nombre de la calle"
											value={calle}
											onChange={(e) => setCalle(e.target.value)}
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-altura" className="input-label">
											Altura
										</label>
										<input
											type="text"
											name="usuario-altura"
											id="usuario-altura"
											className="form-input"
											placeholder="Número"
											value={altura}
											onChange={(e) => setAltura(e.target.value)}
										/>
									</div>
									<div className="input-field">
										<label htmlFor="usuario-piso" className="input-label">
											Piso/Departamento
										</label>
										<input
											type="text"
											name="usuario-piso"
											id="usuario-piso"
											className="form-input"
											placeholder="Opcional"
											value={piso}
											onChange={(e) => setPiso(e.target.value)}
										/>
									</div>
								</div>
							</div>

							<div className="form-actions">
								<button type="submit" className="submit-btn">
									Confirmar pedido
								</button>
							</div>
						</form>
					</div>
				)}

				<aside className="carrito-resume">
					<div className="resume-placeholder">
						<h3>Resumen del Pedido</h3>
						{user
							? carritoProductos.map((item) => (
									<CarritoCard
										detalleCarrito={item}
										key={item.id_DetalleCarrito}
									/>
							  ))
							: carritoEfimero.map((item) => (
									<CarritoCard
										detalleCarrito={normalizarItemCarrito(item)}
										key={item.producto.idProducto}
									/>
							  ))}
					</div>
					<div className="total-info">
						<span className="total-label">Total</span>
						<span className="total-amount">
							${user ? formatPrice(subtotal) : formatPrice(totalCarrito)}
						</span>
					</div>
				</aside>
			</div>
		</section>
	);
};
