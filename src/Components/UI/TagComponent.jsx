import { useNavigate } from "react-router-dom";

export const TagComponent = ({ tag }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		navigate(`/productos/${tag.idTag}`);
	};

	return (
		<article className="tag-container" onClick={handleClick}>
			<div className="tag-img-container">
				<img src={tag.img_url} alt={tag.nombre} loading="lazy" />
			</div>
			<div className="tag-name-container">
				<h3>{tag.nombre}</h3>
			</div>
		</article>
	);
};
