export const AdminCategoryCard = ({ category, onClick }) => {
	return (
		<article className="admin-category-card" onClick={onClick}>
			<p>{category.nombre}</p>
		</article>
	);
};
