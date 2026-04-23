import "./ContrastCheck.css";
import { useEffect, useState } from "react";

export default function ContrastCheck({ firstColor, secondColor }) {
  const [contrastCheckRating, setContrastCheckRating] = useState("⌛");
  const [contrastCheckModifier, setContrastCheckModifier] = useState("");

  useEffect(() => {
    async function postFetch() {
      if (firstColor === secondColor) {
        setContrastCheckRating("Nope");
        setContrastCheckModifier("red");
      } else {
        setContrastCheckRating("⌛");
        setContrastCheckModifier("");
        const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
          mode: "cors",
          method: "POST",
          body: JSON.stringify({ colors: [firstColor, secondColor] }),
        });

        const data = await response.json();
        setContrastCheckRating(data.overall);

        const modifier = data.overall === "Yup" ? "green" : data.overall === "Kinda" ? "orange" : "red";
        setContrastCheckModifier(modifier);
      }
    }
    postFetch();
  }, [firstColor, secondColor]);

  return (
    <p className={`contrast-check contrast-check--${contrastCheckModifier}`}>
      Overall contrast score: {contrastCheckRating}
    </p>
  );
}
