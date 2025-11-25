export const LoadingSpinner = ({ size = 20, color = "currentColor" }) => {
	return (
		<div
			className="loading-spinner"
			style={{
				width: size,
				height: size,
				borderColor: color,
			}}
		></div>
	);
};
