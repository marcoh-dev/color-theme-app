import "./ColorInput.css";
import { useState } from "react";

export default function ColorInput({ id, defaultValue }) {
  const [colorValue, setColorValue] = useState(defaultValue);

  function handleChange(event) {
    setColorValue(event.target.value);
  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        pattern="^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$"
        title="valid hexcode (# + 3/6 hex digits)"
        className="color-form__input color-form__input--text"
        value={colorValue}
        onChange={handleChange}
        required
      />
      <input
        type="color"
        value={colorValue}
        onChange={handleChange}
        className="color-form__input color-form__input--color"
      />
    </>
  );
}
