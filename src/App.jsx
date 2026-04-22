import { initialColors } from "./lib/colors";
import "./App.css";
import useLocalStorageState from "use-local-storage-state";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", { defaultValue: initialColors });
  const defaultColorData = {
    role: "some color",
    hex: "#000",
    contrastText: "#fff",
  };

  function handleFormSubmit(formData) {
    setColors([{ id: uid(), role: formData.role, hex: formData.hex, contrastText: formData.contrastText }, ...colors]);
  }

  function handleColorUpdate(formData) {
    setColors(colors.map((color) => (color.id === formData.id ? { ...color, ...formData } : color)));
  }

  function handleColorDelete(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmit={handleFormSubmit} initialColorData={defaultColorData} submitLabel="add color" />
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
                onColorDelete={handleColorDelete}
                onColorUpdate={handleColorUpdate}
              />
            ))
          )}
        </ul>
      </section>
    </>
  );
}

export default App;
