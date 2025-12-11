export const AdminCategoryCard = ({ category, onClick, isMobile = false }) => {
	return (
		<article
			className={`admin-category-card ${isMobile ? "mobile" : ""}`}
			onClick={onClick}
		>
			<p>{category.nombre}</p>
		</article>
	);
};
