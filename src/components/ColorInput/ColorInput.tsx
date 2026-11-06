import { type ChangeEvent, useState } from "react";

import "./ColorInput.css";

type ColorInputProps = {
	id: string;
	name: string;
	label: string;
	defaultValue: string;
};

export default function ColorInput({ id, name, label, defaultValue }: ColorInputProps) {
	const [colorValue, setColorValue] = useState(defaultValue);

	function handleChange(event: ChangeEvent<HTMLInputElement>) {
		setColorValue(event.target.value);
	}

	return (
		<>
			<input
				type="text"
				id={id}
				name={name}
				pattern="^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$"
				title="valid hexcode (# + 3/6 hex digits)"
				className="color-form__input color-form__input--text"
				value={colorValue}
				onChange={handleChange}
				required
			/>
			<input
				type="color"
				aria-label={`${label} color picker`}
				value={colorValue}
				onChange={handleChange}
				className="color-form__input color-form__input--color"
			/>
		</>
	);
}
