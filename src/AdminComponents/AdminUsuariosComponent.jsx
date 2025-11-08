import { useUsuarios } from "../Hooks/useUsuarios";
import { AdminProduct } from "./UI/AdminProduct";
import { AdminUser } from "./UI/AdminUser";

export const AdminUsuariosComponent = () => {
	const { usuarios } = useUsuarios();

	return (
		<div className="admin-product-wrapper">
			<article className="admin-product-container">
				<div className="admin-product-header">
					<div>Nombre</div>
					<div>Email</div>
					<div>Telefono</div>
					<div>Roles</div>
				</div>
				{usuarios.map((u) => (
					<AdminUser key={u.id_usuarios} usuario={u} />
				))}

				{usuarios.length === 0 && usuarios.length > 0 && (
					<div className="no-result">
						No se encontraron productos con {filter}
					</div>
				)}
			</article>
		</div>
	);
};
