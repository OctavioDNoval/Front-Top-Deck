export const useFormatNum = () => {
	const formatPrice = (price) => {
		if (price === null || price === undefined) return "0";

		const number = Number(price);

		return number.toLocaleString("es-AR", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	};

	return { formatPrice };
};
