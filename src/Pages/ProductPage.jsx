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

	const [categories, setCategories] = useState([]);
	const [isErrorCategory, setIsErrorCategory] = useState(false);
	const [isLoadingCategory, setIsLoadingCategory] = useState(false);

	/*
	 *UseEffect para traer los productos
	 *Y guardarlos en el estado de la pagina
	 */

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
		const fetchCategories = async () => {
			setIsLoadingCategory(true);
			setIsErrorCategory(false);
			try {
				const res = await fetch("http://localhost:8080/category/public/getAll");
				if (!res.ok) {
					setIsErrorCategory(true);
					return;
				}
				const data = await res.json();
				setCategories(data);
			} catch (e) {
				console.log("ERROR EN CARGA DE CATEGORIAS", e);
				setIsError(true);
			} finally {
				setIsLoadingCategory(false);
			}
		};
		fetchCategories();
	}, []);

	useEffect(() => {
		console.log(categories);
		console.log(products);
	}, [products, categories]);

	return (
		<section className="product-page">
			<h2 className="product-page-title">Productos</h2>
			<div className="product-container-wrapper">
				<aside className="product-filter-container">
					<div className="filter-by-category-container">
						<h3 className="filter-by-category-title">Categoria</h3>
						<div className="category-checkbox-container">
							{isLoadingCategory ? (
								<p>...</p>
							) : isErrorCategory ? (
								<p>error</p>
							) : (
								categories.map((c) => (
									<label key={c.idCategoria}>
										<input type="checkbox" value={c.idCategoria} />
										{c.nombre}
									</label>
								))
							)}
						</div>
					</div>
				</aside>
				<main
					className={`product-container ${isLoading | isError ? "loader" : ""}`}
				>
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
