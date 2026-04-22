import { initialColors } from "./lib/colors";
import "./App.css";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);

  function handleFormSubmit(formData) {
    setColors([{ id: uid(), role: formData.role, hex: formData.hex, contrastText: formData.contrastText }, ...colors]);
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={handleFormSubmit}></ColorForm>
      <ul className="color-themes">
        <li className="color-theme">
          {colors.map((color) => (
            <Color key={color.id} role={color.role} hex={color.hex} contrastText={color.contrastText} />
          ))}
        </li>
      </ul>
    </>
  );
}

export default App;
