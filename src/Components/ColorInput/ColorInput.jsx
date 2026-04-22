import { useState } from "react";
import "./ColorInput.css";

export default function ColorInput({ id, defaultValue }) {
  const [colorValue, setColorValue] = useState(defaultValue);

  function handleOnChange(event) {
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
        onChange={handleOnChange}
        required
      ></input>
      <input
        type="color"
        value={colorValue}
        onChange={handleOnChange}
        className="color-form__input color-form__input--color"
      ></input>
    </>
  );
}
