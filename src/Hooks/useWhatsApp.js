import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export const useWhatsApp = () => {
	const { user, carritoProductos } = useContext(AuthContext);

	const generarMensajeEfimero = (usuarioData, direccionData) => {
		const carritoEfimeroStr = sessionStorage.getItem("carritoEfimero");
		const carritoEfimero = carritoEfimeroStr
			? JSON.parse(carritoEfimeroStr)
			: [];
		const usuario = usuarioData;
		const direccion = direccionData;

		let subTotal = 0;

		carritoEfimero.forEach((item) => {
			subTotal += item.producto.precio * item.cantidad;
		});

		const listaProductos = carritoEfimero
			.map(
				(item) =>
					`• ${item.producto.nombre} x${item.cantidad} - $${
						item.producto.precio * item.cantidad
					}`
			)
			.join("\n");

		const mensaje = `
🛒 *NUEVO PEDIDO ONLINE* 🛒

👤 *INFORMACIÓN DEL CLIENTE*
━━━━━━━━━━━━━━━━━━━━
• 🧑‍💼 *Nombre:* ${usuario.nombre}
• 📧 *Email:* ${usuario.email}

📍 *DIRECCIÓN DE ENVÍO*
━━━━━━━━━━━━━━━━━━━━
• 🏠 *Dirección:* ${direccion.direccion} ${direccion.altura}
• 🏢 *Piso:* ${direccion.piso || "No especificado"}
• 🏙️ *Ciudad:* ${direccion.ciudad}
• 🗺️ *Provincia:* ${direccion.provincia}
• 📮 *Código Postal:* ${direccion.codigo_postal}
• 🌍 *País:* ${direccion.pais || "Argentina"}

📦 *PRODUCTOS SOLICITADOS*
━━━━━━━━━━━━━━━━━━━━
${listaProductos}

💰 *RESUMEN DEL PEDIDO*
━━━━━━━━━━━━━━━━━━━━
• 💵 *Subtotal:* $${subTotal}
• 🚚 *Envío:* A determinar
• 💰 *Total:* $${subTotal} (más envío)

📋 *NOTAS ADICIONALES*
━━━━━━━━━━━━━━━━━━━━
• Cliente: Usuario efímero
• Pago: A coordinar
• Entrega: A confirmar

¡Por favor, procesa este pedido! 🎉

*¡Gracias por tu atención!* 😊
`.trim();

		return mensaje;
	};

	const generarMensajeAutenticado = (direccion) => {
		let subTotal = 0;

		carritoProductos.forEach((item) => {
			subTotal += item.productoDTO.precio * item.cantidad;
		});

		const listaProductos = carritoProductos
			.map(
				(item) =>
					`• ${item.productoDTO.nombre} x${item.cantidad} - $${
						item.productoDTO.precio * item.cantidad
					}`
			)
			.join("\n");

		const mensaje = `
🛒 *NUEVO PEDIDO ONLINE* 🛒

👤 *INFORMACIÓN DEL CLIENTE*
━━━━━━━━━━━━━━━━━━━━
• 🧑‍💼 *Nombre:* ${user.nombre}
• 📧 *Email:* ${user.email}

📍 *DIRECCIÓN DE ENVÍO*
━━━━━━━━━━━━━━━━━━━━
• 🏠 *Dirección:* ${direccion.direccion} ${direccion.altura}
• 🏢 *Piso:* ${direccion.piso || "No especificado"}
• 🏙️ *Ciudad:* ${direccion.ciudad}
• 🗺️ *Provincia:* ${direccion.provincia}
• 📮 *Código Postal:* ${direccion.codigo_postal}
• 🌍 *País:* ${direccion.pais || "Argentina"}

📦 *PRODUCTOS SOLICITADOS*
━━━━━━━━━━━━━━━━━━━━
${listaProductos}

💰 *RESUMEN DEL PEDIDO*
━━━━━━━━━━━━━━━━━━━━
• 💵 *Subtotal:* $${subTotal}
• 🚚 *Envío:* A determinar
• 💰 *Total:* $${subTotal} (más envío)

📋 *NOTAS ADICIONALES*
━━━━━━━━━━━━━━━━━━━━
• Cliente: Usuario efímero
• Pago: A coordinar
• Entrega: A confirmar

¡Por favor, procesa este pedido! 🎉

*¡Gracias por tu atención!* 😊
`.trim();

		return mensaje;
	};

	const enviarWhatsApp = (usuario, direccion) => {
		let mensaje = "";
		if (user) {
			mensaje = generarMensajeAutenticado(direccion);
		} else {
			mensaje = generarMensajeEfimero(usuario, direccion);
		}

		const telefonoTienda = import.meta.env.VITE_PHONE_NUMBER;

		const mensajeCodificado = encodeURIComponent(mensaje);
		const urlWhatsApp = `https://wa.me/${telefonoTienda}?text=${mensajeCodificado}`;

		window.open(urlWhatsApp, "_blank");
	};

	return {
		enviarWhatsApp,
		generarMensajeAutenticado,
	};
};
