import { useState } from "react";

import ColorForm from "@/components/ColorForm/ColorForm";
import ContrastCheck from "@/components/ContrastCheck/ContrastCheck";
import CopyToClipboard from "@/components/CopyToClipboard/CopyToClipboard";
import type { Color as ColorType, ColorData } from "@/types";

import "./Color.css";

type ColorProps = {
	color: ColorType;
	isFirst: boolean;
	isLast: boolean;
	onColorDelete: (colorId: string) => void;
	onColorUpdate: (color: ColorType) => void;
	onColorMove: (colorId: string, direction: -1 | 1) => void;
};

export default function Color({
	color,
	isFirst,
	isLast,
	onColorDelete,
	onColorUpdate,
	onColorMove,
}: ColorProps) {
	const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false);
	const [isEditFormVisible, setIsEditFormVisible] = useState(false);
	const { id, role, hex, contrastText } = color;

	function handleUpdateForm(colorData: ColorData) {
		setIsEditFormVisible(false);
		onColorUpdate({ id, ...colorData });
	}

	return (
		<li className="color-card" style={{ backgroundColor: hex, color: contrastText }}>
			{!isFirst ? (
				<button
					className="color-card__move-color color-card__move-color--backwards"
					onClick={() => onColorMove(id, -1)}
					aria-label="Move color up"
				>
					▲
				</button>
			) : null}
			{!isLast ? (
				<button
					className="color-card__move-color color-card__move-color--forwards"
					onClick={() => onColorMove(id, 1)}
					aria-label="Move color down"
				>
					▼
				</button>
			) : null}
			<div className="color-card__flexwrap">
				<h2 className="color-card__highlight">{hex}</h2>
				<CopyToClipboard copyValue={hex} />
			</div>
			<p className="color-card__role">{role}</p>
			<p className="color-card__contrast">contrast: {contrastText}</p>
			<ContrastCheck firstColor={hex} secondColor={contrastText} />
			{isEditFormVisible ? (
				<section className="color-card__form">
					<ColorForm
						onSubmitColor={handleUpdateForm}
						initialColorData={{ role, hex, contrastText }}
						submitLabel="update color"
					/>
				</section>
			) : null}
			<section className="color-card__buttons">
				{isConfirmDeleteVisible ? (
					<>
						<div className="color-card__confirm">
							<h3 className="color-card__highlight">Really delete?</h3>
						</div>
						<button
							className="color-card__button"
							onClick={() => setIsConfirmDeleteVisible(false)}
						>
							Cancel
						</button>
						<button className="color-card__button" onClick={() => onColorDelete(id)}>
							Delete
						</button>
					</>
				) : isEditFormVisible ? (
					<button
						className="color-card__button"
						onClick={() => setIsEditFormVisible(false)}
					>
						Cancel
					</button>
				) : (
					<>
						<button
							className="color-card__button"
							onClick={() => setIsConfirmDeleteVisible(true)}
						>
							Delete
						</button>
						<button
							className="color-card__button"
							onClick={() => setIsEditFormVisible(true)}
						>
							Edit
						</button>
					</>
				)}
			</section>
		</li>
	);
}
