import { initialColors } from "./lib/colors";
import "./App.css";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState(initialColors);
  const defaultColorData = {
    role: "some color",
    hex: "#000",
    contrastText: "#fff",
  };

  function handleFormSubmit(formData) {
    setColors([{ id: uid(), role: formData.role, hex: formData.hex, contrastText: formData.contrastText }, ...colors]);
  }

  function handleColorUpdate(formData) {
    setColors(
      colors.map((color) =>
        color.id === formData.id
          ? { ...color, hex: formData.hex, role: formData.role, contrastText: formData.contrastText }
          : color,
      ),
    );
  }

  function handleColorDelete(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={handleFormSubmit} initialColorData={defaultColorData} submitLabel="add color"></ColorForm>
      <section className="color-themes">
        <ul className="color-theme">
          {colors.length == 0 ? (
            <li className="no-color-card">
              <p>
                No colors... <strong>start by adding one!</strong>
              </p>
            </li>
          ) : (
            colors.map((color) => (
              <Color
                key={color.id}
                id={color.id}
                role={color.role}
                hex={color.hex}
                contrastText={color.contrastText}
                onDelete={handleColorDelete}
                onUpdate={handleColorUpdate}
              />
            ))
          )}
        </ul>
      </section>
    </>
  );
}

export default App;
