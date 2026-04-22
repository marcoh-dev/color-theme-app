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

  function handleColorDelete(uid) {
    setColors(colors.filter((color) => color.id !== uid));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={handleFormSubmit}></ColorForm>
      <ul className="color-themes">
        <li className="color-theme">
          {colors.length == 0 ? (
            <section className="no-color-card">
              <p>
                No colors... <strong>start by adding one!</strong>
              </p>
            </section>
          ) : (
            colors.map((color) => (
              <Color
                key={color.id}
                id={color.id}
                role={color.role}
                hex={color.hex}
                contrastText={color.contrastText}
                onDelete={handleColorDelete}
              />
            ))
          )}
        </li>
      </ul>
    </>
  );
}

export default App;
