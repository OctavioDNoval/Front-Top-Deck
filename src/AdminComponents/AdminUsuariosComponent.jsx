import { useMemo, useState } from "react";
import { useUsuarios } from "../Hooks/useUsuarios";
import { AdminProduct } from "./UI/AdminProduct";
import { AdminUser } from "./UI/AdminUser";

export const AdminUsuariosComponent = () => {
	const { usuarios } = useUsuarios();
	const [filter, setFilter] = useState("");

	const filteredUsuarios = useMemo(() => {
		if (!filter) return usuarios;

		const searchTerm = filter.toLowerCase();
		return usuarios.filter(
			(usuarios) =>
				usuarios.nombre.toLowerCase().includes(searchTerm) ||
				usuarios.email.toLowerCase().includes(searchTerm)
		);
	}, [usuarios, filter]);
	return (
		<div className="admin-product-wrapper">
			<div className="admin-products-buttons">
				<input
					type="text"
					name="filter"
					placeholder="Buscar"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<article className="admin-product-container">
				<div className="admin-product-header">
					<div>Nombre</div>
					<div>Email</div>
					<div>Telefono</div>
					<div>Roles</div>
				</div>
				{filteredUsuarios.map((u) => (
					<AdminUser key={u.id_usuarios} usuario={u} />
				))}

				{filteredUsuarios.length === 0 && usuarios.length > 0 && (
					<div className="no-result">
						No se encontraron productos con {filter}
					</div>
				)}
			</article>
		</div>
	);
};
