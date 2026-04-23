import "./CopyToClipboard.css";
import { useEffect, useState } from "react";

export default function CopyToClipboard({
  copyValue,
  buttonLabel = "copy",
  copySuccessLabel = "successfully copied!",
  timeout = 3000,
}) {
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
      console.error(error.message);
    }
  }

  return (
    <button className="color-card__button" onClick={handleClick} disabled={isCopied ? true : false}>
      {isCopied ? copySuccessLabel : buttonLabel}
    </button>
  );
}
