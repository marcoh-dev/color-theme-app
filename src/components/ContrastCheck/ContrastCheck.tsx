import { useEffect, useState } from "react";

import "./ContrastCheck.css";

type ContrastResult = {
	rating: string;
	modifier: string;
	error: string;
};

type ContrastCheckProps = {
	firstColor: string;
	secondColor: string;
};

const PENDING: ContrastResult = { rating: "⌛", modifier: "", error: "" };
const SAME_COLOR: ContrastResult = { rating: "Nope", modifier: "red", error: "" };

function getModifier(rating: string) {
	if (rating === "Yup") return "green";
	if (rating === "Kinda") return "orange";
	return "red";
}

async function fetchContrastRating(
	firstColor: string,
	secondColor: string,
	signal: AbortSignal,
): Promise<ContrastResult> {
	try {
		const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
			mode: "cors",
			method: "POST",
			body: JSON.stringify({ colors: [firstColor, secondColor] }),
			signal,
		});

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}: Unknown error`);
		}

		const { overall } = (await response.json()) as { overall: string };

		return { rating: overall, modifier: getModifier(overall), error: "" };
	} catch (error) {
		return {
			rating: "❌",
			modifier: "",
			error: error instanceof Error ? error.message : String(error),
		};
	}
}

export default function ContrastCheck({ firstColor, secondColor }: ContrastCheckProps) {
	const colorKey = `${firstColor}|${secondColor}`;
	const isSameColor = firstColor === secondColor;
	const [result, setResult] = useState<{ colorKey: string } & ContrastResult>();

	useEffect(() => {
		if (isSameColor) {
			return;
		}

		const controller = new AbortController();

		fetchContrastRating(firstColor, secondColor, controller.signal).then((contrastResult) => {
			if (!controller.signal.aborted) {
				setResult({ colorKey, ...contrastResult });
			}
		});

		return () => controller.abort();
	}, [firstColor, secondColor, isSameColor, colorKey]);

	const { rating, modifier, error } = isSameColor
		? SAME_COLOR
		: result?.colorKey === colorKey
			? result
			: PENDING;

	return (
		<p className={`contrast-check contrast-check--${modifier}`}>
			Overall contrast score: {rating}{" "}
			{error !== "" ? (
				<span className="contrast-check__information" title={error}>
					[?]
				</span>
			) : null}
		</p>
	);
}
