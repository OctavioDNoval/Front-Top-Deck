import { useEffect, useState } from "react";
import { CategoryCard } from "../Components/UI/CategoryCard";

export const HomePage = () => {
	const [carruselImg, setCarruselImg] = useState([]);
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const imagenes = [
			"/img/carrusel/carrusel1.png",
			"/img/carrusel/carrusel2.png",
			"/img/carrusel/carrusel3.png",
		];
		setCarruselImg(imagenes);
	}, []);

	useEffect(() => {
		if (carruselImg.length === 0) return;
		const interval = setInterval(() => {
			setIndex((prevIndex) => (prevIndex + 1) % carruselImg.length);
		}, 4000);

		return () => clearInterval(interval);
	}, [carruselImg]);

	return (
		<>
			<main className="home-main">
				<section className="promo-carrusel">
					{carruselImg.map((img, i) => (
						<img
							key={i}
							src={img}
							alt={`Carrusel N ${i}`}
							className={`promo-carrusel-image ${i === index ? "active" : ""}`}
						/>
					))}
				</section>
				<section className="categorias">
					<CategoryCard category="Sobres" img="/img/categorias/sobres.jpg" />
					<CategoryCard
						category="Extras"
						img="/img/categorias/Collection.webp"
					/>
				</section>
			</main>
		</>
	);
};
