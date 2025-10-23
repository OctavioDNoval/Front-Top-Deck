import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const SelectedProductPage = () => {
	const { id } = useParams();
	const [producto, setProducto] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMsg, setErrorMsg] = useState("");

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
		<div>
			<p>{id}</p>
		</div>
	);
};
