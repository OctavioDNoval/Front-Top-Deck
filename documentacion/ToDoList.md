# To Do List (Funcionalidad Completa)

---

## Front

### Estilos

- [x] hacer mobile para el carrusel (_HomePage_)
- [x] mejorar Media Queries del footer (_FooterComponent_)
- [x] Footer link a _blank (\_FooterComponent_)
- [x] Hacer todas las Media Queries de la pagina de productos (_ProductPage_)
- [x] Sacar botones de (+) en las tarjetas de productos (_ProductCard_)
- [x] Hacer Media Queries de la pagina de producto seleccionada (_SelectedProductPage_)
- [x] Hacer que los precios aparezcan en blanco (_SelectedProductPage_)
- [ ] Media Queries del carrito? (_CarritoComponent_)
- [x] Rehacer el componente que muestra el Perfil (_ProfileComponent_)
- [x] Mostrar los datos de la cuenta como telefono (_ProfileComponent_)
- [ ] Mostrar las direcciones guardadas del usuario (_ProfileComponent_)
- [x] Media queries para el profile log in
- [ ] Hacer media queries del adminApp(_AdminApp_)

### Funcionalidades

- [ ] Paginacion de productos (_ProductPage_)
- [ ] Paginacion de Logs (_AdminLogs_)
- [ ] Autoseleccion de la direccion principal en base al campo de la base de datos (_PedidoPage / DireccionCard_)
- [ ] Modal para terminos de uso y condiciones (_ModalTerminosComponent_)
  - [ ] actualizacion manual?
  - [ ] actualizacion en BDD?
- [ ] Arreglar mensaje de WP, no se ven los emojis, arreglar eso (_useWhatsApp_)
- [ ] Agregar para eliminar, agregar imagenes del carrusel en el admin (_AdminApp_)
- [ ] EventosPage?

## Back

### Pedidos

- [ ] Al confirmar el pedido guardarlo en la base de datos

### Direcciones

- [ ] Borrar Direccion
- [ ] Verificar que al hacer un pedido sin usuario, se verifique que la direccion ya exista en la base de datos

### Usuarios

- [ ] Verificar al hacer un pedido si el mail ya existe para no cargar el usuario

## Base De Datos

### Tablas

- [ ] agregar a la tabla de pedidos los campos de IP del usuario que pidio, terminos aceptados (booleano), version de los terminos aceptados (_Tabla Pedidos_)
