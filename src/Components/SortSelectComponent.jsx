import { useState } from "react";

export const SortSelectComponent = ({ onChange }) => {
	const [optionSelected, setOptionSelected] = useState("");

	const handleChange = (e) => {
		const value = e.target.value;
		setOptionSelected(value);
		onChange(value);
	};

	return (
		<>
			<select
				id="sort"
				value={optionSelected}
				onChange={handleChange}
				className="select-option"
			>
				<option value="">Seleccionar...</option>
				<option value="prec-des">Mayor a Menor</option>
				<option value="prec-acs">Menor a Mayor</option>
				<option value="alfabetico">Alfabetico</option>
			</select>
		</>
	);
};
