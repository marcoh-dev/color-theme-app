import "./ContrastCheck.css";
import { useEffect, useState } from "react";

export default function ContrastCheck({ firstColor, secondColor }) {
  const [contrastCheckRating, setContrastCheckRating] = useState("⌛");
  const [contrastCheckModifier, setContrastCheckModifier] = useState("");
  const [contrastCheckAdditionalInformation, setContrastCheckAdditionalInformation] = useState("");

  useEffect(() => {
    async function fetchContrastRating() {
      if (firstColor === secondColor) {
        setContrastCheckRating("Nope");
        setContrastCheckModifier("red");
      } else {
        try {
          setContrastCheckRating("⌛");
          setContrastCheckModifier("");
          setContrastCheckAdditionalInformation("");
          const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({ colors: [firstColor, secondColor] }),
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${"Unknown error"}`);
          }
          const data = await response.json();
          setContrastCheckRating(data.overall);

          const modifier = data.overall === "Yup" ? "green" : data.overall === "Kinda" ? "orange" : "red";
          setContrastCheckModifier(modifier);
        } catch (error) {
          setContrastCheckRating("❌");
          setContrastCheckAdditionalInformation(error.message);
        }
      }
    }
    fetchContrastRating();
  }, [firstColor, secondColor]);

  return (
    <p className={`contrast-check contrast-check--${contrastCheckModifier}`}>
      Overall contrast score: {contrastCheckRating}{" "}
      {contrastCheckAdditionalInformation != "" ? (
        <span className="contrast-check__information" title={contrastCheckAdditionalInformation}>
          [?]
        </span>
      ) : null}
    </p>
  );
}
