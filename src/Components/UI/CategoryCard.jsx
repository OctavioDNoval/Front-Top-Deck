export const CategoryCard = ({ category, img }) => {
	return (
		<article className="category-card">
			<h2 className="category-title">{category}</h2>
			<img
				src={img}
				alt={`Foto de categoria: ${category}`}
				className="category-card-image"
			/>
		</article>
	);
};
