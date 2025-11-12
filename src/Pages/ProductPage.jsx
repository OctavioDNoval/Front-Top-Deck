import { useEffect, useEffectEvent, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { ProductCard } from "../Components/UI/ProductCard";
import { LoadingCartel } from "../Components/UI/LoadingCartel";
import { ErrorCartel } from "../Components/UI/ErrorCartel";
import { SortSelectComponent } from "../Components/SortSelectComponent";
import { useTags } from "../Hooks/useTags";

export const ProductPage = () => {
	const { id_tag } = useParams();

	const [products, setProducts] = useState([]);
	const [filteredProducts, setfilteredProducts] = useState([]);
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [sort, setSort] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

	const [categories, setCategories] = useState([]);
	const [isErrorCategory, setIsErrorCategory] = useState(false);
	const [isLoadingCategory, setIsLoadingCategory] = useState(false);

	const { tags, isLoading: isLoadingTags, error } = useTags();
	const [selectedTag, setSelectedTag] = useState(id_tag ? parseInt(id_tag) : 0);

	const navigate = useNavigate();

	const handleOnChangeSort = (option) => {
		setSort(option);
	};

	const handleCategoryChange = (category) => {
		setSelectedCategories((prev) =>
			prev.includes(category)
				? prev.filter((id) => id !== category)
				: [...prev, category]
		);
	};

	const handleTagChange = (id) => {
		setSelectedTag(id);
	};

	/*UseEffect que se va a encargar de filtrar 
	los productos por categoria y ordenarlos a su vez*/

	useEffect(() => {
		let result = [...products];

		if (selectedCategories.length > 0) {
			result = result.filter((p) =>
				selectedCategories.includes(p.categoria.idCategoria)
			);
		}
		if (selectedTag != 0 && products.length > 0) {
			result = result.filter((p) => p.tagId === selectedTag);
		}

		switch (sort) {
			case "prec-des":
				result.sort((a, b) => b.precio - a.precio);
				break;
			case "prec-acs":
				result.sort((a, b) => a.precio - b.precio);
				break;
			case "alfabetico":
				result.sort((a, b) => a.nombre.localeCompare(b.nombre));
				break;
			default:
				break;
		}

		setfilteredProducts(result);
	}, [products, selectedCategories, sort, selectedTag]);

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
				setfilteredProducts(data);
				console.log("Estos son los productos: ", data);
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
		if (id_tag) {
			const tag = parseInt(id_tag);
			setSelectedTag(tag);
		}
	}, [id_tag]);

	return (
		<section className="product-page">
			<h2 className="product-page-title">Productos</h2>
			<div className="product-container-wrapper">
				<aside className="product-filter-container">
					{/*CheckBox para las categorias*/}
					<div className="filter-by-category-container filter">
						<h3 className="filter-title">Categoria</h3>
						<div className="category-checkbox-container">
							{isLoadingCategory ? (
								<p>...</p>
							) : isErrorCategory ? (
								<p>error</p>
							) : (
								categories.map((c) => (
									<label
										key={c.idCategoria}
										className="category-checkbox-label"
									>
										<input
											type="checkbox"
											value={c.idCategoria}
											checked={selectedCategories.includes(c.idCategoria)}
											onChange={() => handleCategoryChange(c.idCategoria)}
											className="category-checkbox"
										/>
										{c.nombre}
									</label>
								))
							)}
						</div>
					</div>
					{/*CheckBox para los Tags*/}
					<div className="filter-by-category-container filter">
						<h3 className="filter-title">Franquicia</h3>
						<div className="category-checkbox-container">
							{isLoadingTags ? (
								<p>...</p>
							) : error ? (
								<p>error</p>
							) : (
								<>
									<label className="category-checkbox-label">
										<input
											type="radio"
											value={0}
											onChange={() => {
												handleTagChange(0);
												if (id_tag) {
													navigate("/productos");
												}
											}}
											checked={selectedTag === 0 ? true : false}
											className="category-checkbox"
										/>
										Todo
									</label>
									{tags.map((t) => (
										<label key={t.idTag} className="category-checkbox-label">
											<input
												type="radio"
												value={t.idTag}
												onChange={() => {
													handleTagChange(t.idTag);
													navigate(`/productos/tag/${t.idTag}`);
												}}
												checked={t.idTag === selectedTag ? true : false}
												className="category-checkbox"
											/>
											{t.nombre}
										</label>
									))}
								</>
							)}
						</div>
					</div>
					<div className="orderby-container filter">
						<h3 className="filter-title">Ordenar</h3>
						<SortSelectComponent onChange={handleOnChangeSort} />
					</div>
				</aside>
				<main
					className={`product-container ${
						isLoading || isError ? "loader" : ""
					}`}
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
						filteredProducts.map((p) => (
							<ProductCard product={p} key={p.productoId} />
						))
					)}
				</main>
			</div>
		</section>
	);
};
