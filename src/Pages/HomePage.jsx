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

		const intervalo = setInterval(() => {
			let nextIndex = index + 1;
			if (nextIndex >= carruselImg.length) {
				nextIndex = 0;
			}
			setIndex(nextIndex);
		}, 3000);

		return () => clearInterval(intervalo);
	}, []);

	return (
		<>
			<main>
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
					<CategoryCard category="Sobres" />
					<CategoryCard category="Extras" />
				</section>
			</main>
		</>
	);
};
