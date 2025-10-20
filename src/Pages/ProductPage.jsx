import { useEffect, useState } from "react";
import { data } from "react-router-dom";

export const ProductPage = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			try {
				const res = await fetch("http://localhost:8080/products/public/getAll");
				const data = await res.json();
				setProducts(data);
				console.log(data);
			} catch (err) {
				console.error(err);
			} finally {
				setIsLoading(false);
			}
		};
		fetchProducts();
	}, []);

	useEffect(() => {
		console.log(products);
	}, [products]);

	return (
		<section className="product-page">
			<h2 className="product-page-title">Productos</h2>
		</section>
	);
};
