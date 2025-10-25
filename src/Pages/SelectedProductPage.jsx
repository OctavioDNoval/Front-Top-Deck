import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useCounter } from "../Hooks/useCounter";
import { LoadingCartel } from "../Components/UI/LoadingCartel";
import { ErrorCartel } from "../Components/UI/ErrorCartel";

export const SelectedProductPage = () => {
	const { id } = useParams();
	const [producto, setProducto] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");
	const { counter, increment, reset, decrement } = useCounter(1);

	useEffect(() => {
		const fetchProductById = async () => {
			setIsLoading(true);
			try {
				const res = await fetch(`http://localhost:8080/products/public/${id}`);

				if (!res.ok) {
					setIsError(true);
					setErrorMsg(`Error ${res.status} : ${res.statusText}`);
					return;
				}

				const data = await res.json();
				setProducto(data);
			} catch (err) {
				setIsError(true);
				setErrorMsg("Error en el servidor");
			} finally {
				setIsLoading(false);
			}
		};
		fetchProductById();
	}, []);

	return (
		<section className="product-selected-page">
			{isLoading ? (
				<LoadingCartel />
			) : isError ? (
				<ErrorCartel message={errorMsg} />
			) : (
				<div className="product-selected-wrapped">
					<div className="product-selected-img-container">
						<img
							src={producto.img_url}
							alt={producto.nombre}
							className="product-selected-img"
						/>
					</div>
					<div className="product-selected-info-container">
						<div className="product-selected-info">
							<h2 className="product-selected-name">{producto.nombre}</h2>
							<p className="product-selected-price">${producto.precio}</p>
							<p className="product-selected-desc">{producto.descripcion}</p>

							<div className="number-input">
								<button
									type="button"
									className="btn-plus btn"
									onClick={() => decrement(1, false)}
								>
									-
								</button>
								<p>{counter}</p>
								<button
									type="button"
									className="btn-less btn"
									onClick={() => increment(1)}
								>
									<p>+</p>
								</button>
							</div>
						</div>

						<div className="product-selected-buy">
							<button className="product-selected-add">
								Añadir al carrito
							</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};
