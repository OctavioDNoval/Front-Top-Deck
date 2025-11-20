export const useWhatsApp = () => {
	const generarMensaje = (usuarioData, direccionData) => {
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

		console.log("Usuario para el mensaje: ", usuario);
		console.log("Direccion para el mensaje: ", direccion);

		const mensaje = `
            ¡Hola! Tengo un nuevo pedido desde la web:

            👤 *DATOS DEL CLIENTE:*
            • Nombre: ${usuario.nombre}
            • Email: ${usuario.email}

            📍 *DIRECCIÓN DE ENVÍO:*
            • Dirección: ${direccion.direccion} ${direccion.altura}
            • Piso: ${direccion.piso || "No especificado"}
            • Ciudad: ${direccion.ciudad}
            • Provincia: ${direccion.provincia}
            • Código Postal: ${direccion.codigo_postal}
            • País: ${direccion.pais || "Argentina"}

            🛒 *PRODUCTOS SOLICITADOS:*
            ${listaProductos}

            💰 *RESUMEN DEL PEDIDO:*
            • *TOTAL: $${subTotal}*
            • Costo de envío: A determinar

            ¿Podrías procesar este pedido? ¡Gracias! 🎉
        `.trim();

		return mensaje;
	};

	const enviarWhatsApp = (usuario, direccion) => {
		const mensaje = generarMensaje(usuario, direccion);
		const telefonoTienda = import.meta.env.VITE_PHONE_NUMBER;

		const mensajeCodificado = encodeURIComponent(mensaje);
		const urlWhatsApp = `https://wa.me/${telefonoTienda}?text=${mensajeCodificado}`;

		window.open(urlWhatsApp, "_blank");
	};

	return {
		enviarWhatsApp,
	};
};
