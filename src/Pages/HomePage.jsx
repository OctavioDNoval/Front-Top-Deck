import { useEffect, useEffectEvent, useState } from "react";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { useTags } from "../Hooks/useTags";
import { TagComponent } from "../Components/UI/TagComponent";
import { Navigate, useNavigate } from "react-router-dom";

export const HomePage = () => {
	const navigate = useNavigate();

	const [carruselImg, setCarruselImg] = useState([]);
	const [index, setIndex] = useState(0);

	const { tags } = useTags();

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const folderRef = ref(storage, "PromosCarrusel");
				const res = await listAll(folderRef);
				const urlPromises = res.items.map((imageRef) =>
					getDownloadURL(imageRef)
				);
				const urls = await Promise.all(urlPromises);
				setCarruselImg(urls);
			} catch (e) {
				console.log(e.message);
			}
		};
		fetchImages();
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
				<section className="tags-container-home-page">
					{tags.map((t) => (
						<TagComponent tag={t} key={t.idTag} />
					))}
				</section>
			</main>
		</>
	);
};
