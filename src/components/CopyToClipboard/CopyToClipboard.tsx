import { useEffect, useState } from "react";

import "./CopyToClipboard.css";

type CopyToClipboardProps = {
	copyValue: string;
	buttonLabel?: string;
	copySuccessLabel?: string;
	timeout?: number;
};

export default function CopyToClipboard({
	copyValue,
	buttonLabel = "copy",
	copySuccessLabel = "successfully copied!",
	timeout = 3000,
}: CopyToClipboardProps) {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		if (!isCopied) {
			return;
		}

		const timer = setTimeout(() => {
			setIsCopied(false);
		}, timeout);

		return () => clearTimeout(timer);
	}, [isCopied, timeout]);

	async function handleClick() {
		try {
			await navigator.clipboard.writeText(copyValue);
			setIsCopied(true);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<button className="color-card__button" onClick={handleClick} disabled={isCopied}>
			{isCopied ? copySuccessLabel : buttonLabel}
		</button>
	);
}
