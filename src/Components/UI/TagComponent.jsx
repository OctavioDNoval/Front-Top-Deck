export const TagComponent = ({ tag }) => {
	return (
		<article className="tag-container">
			<div className="tag-img-container">
				<img src={tag.img_url} alt={tag.nombre} loading="lazy" />
			</div>
			<div className="tag-name-container">
				<h3>{tag.nombre}</h3>
			</div>
		</article>
	);
};
