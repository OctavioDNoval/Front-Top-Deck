import { useEffect, useState } from "react";
import { data } from "react-router-dom";
import { ProductCard } from "../Components/UI/ProductCard";
import { LoadingCartel } from "../Components/UI/LoadingCartel";
import { ErrorCartel } from "../Components/UI/ErrorCartel";

export const ProductPage = () => {
	const [products, setProducts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	useEffect(() => {
		const fetchProducts = async () => {
			setIsLoading(true);
			setIsError(false);
			setErrorMsg("");
			try {
				const res = await fetch("http://localhost:8080/products/public/getAll");
				if (!res.ok) {
					setIsError(true);
					setErrorMsg(`Error ${res.status}: ${res.statusText}`);
					return;
				}
				const data = await res.json();
				setProducts(data);
			} catch (err) {
				console.error(err);
				setIsError(true);
				setErrorMsg("Error al conectar el servidor");
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
			<div className="product-container-wrapper">
				<aside className="product-filter-container">
					<input type="checkbox" />
					<input type="checkbox" />
					<input type="checkbox" />
				</aside>
				<main className="product-container">
					{isLoading ? (
						<div className="wrapper">
							<LoadingCartel />
						</div>
					) : isError ? (
						<div className="wrapper">
							<ErrorCartel message={errorMsg} />
						</div>
					) : (
						products.map((p) => <ProductCard product={p} key={p.productoId} />)
					)}
				</main>
			</div>
		</section>
	);
};
