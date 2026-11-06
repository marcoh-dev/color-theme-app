import { type FormEvent, useId } from "react";

import ColorInput from "@/components/ColorInput/ColorInput";
import type { ColorData } from "@/types";

import "./ColorForm.css";

type ColorFormProps = {
	onSubmitColor: (colorData: ColorData) => void;
	submitLabel: string;
	initialColorData: ColorData;
};

export default function ColorForm({
	onSubmitColor,
	submitLabel,
	initialColorData,
}: ColorFormProps) {
	const id = useId();

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		onSubmitColor({
			role: String(formData.get("role")),
			hex: String(formData.get("hex")),
			contrastText: String(formData.get("contrastText")),
		});
	}

	return (
		<form className="color-form" autoComplete="off" onSubmit={handleSubmit}>
			<section className="color-form__section">
				<label className="color-form__label" htmlFor={`${id}-role`}>
					Role
				</label>
				<input
					type="text"
					id={`${id}-role`}
					name="role"
					defaultValue={initialColorData.role}
					className="color-form__input  color-form__input--text"
					required
				/>
			</section>
			<section className="color-form__section">
				<label className="color-form__label" htmlFor={`${id}-hex`}>
					Hex
				</label>
				<ColorInput
					id={`${id}-hex`}
					name="hex"
					label="Hex"
					defaultValue={initialColorData.hex}
				/>
			</section>
			<section className="color-form__section">
				<label className="color-form__label" htmlFor={`${id}-contrastText`}>
					Contrast Text
				</label>
				<ColorInput
					id={`${id}-contrastText`}
					name="contrastText"
					label="Contrast Text"
					defaultValue={initialColorData.contrastText}
				/>
			</section>
			<section className="color-form__section">
				<button className="color-form__button">{submitLabel}</button>
			</section>
		</form>
	);
}
