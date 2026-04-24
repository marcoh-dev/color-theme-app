import "./App.css";
import { initialColors } from "./lib/colors";
import { initialThemes } from "./lib/themes";
import { useEffect } from "react";
import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";
import Color from "./Components/Color/Color";
import ColorForm from "./Components/ColorForm/ColorForm";
import ThemeForm from "./Components/ThemeForm/ThemeForm";

function App() {
  const [colors, setColors] = useLocalStorageState("colors", { defaultValue: initialColors });
  const [themes, setThemes] = useLocalStorageState("themes", { defaultValue: initialThemes });
  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", { defaultValue: themes[0] });
  const [currentThemeColors, setCurrentThemeColors] = useLocalStorageState("currentThemeColors", { defaultValue: [] });
  const [themeLastAction, setThemeLastAction] = useLocalStorageState("themeLastAction", { defaultValue: null });
  const [themeFormMode, setThemeFormMode] = useLocalStorageState("themeFormMode", { defaultValue: "" });
  const defaultColorData = {
    role: "some color",
    hex: "#000",
    contrastText: "#fff",
  };

  useEffect(() => {
    if (themeLastAction) {
      if (themeLastAction?.type === "delete") {
        setCurrentTheme(themes[0]);
      } else {
        setCurrentTheme(themes.find((theme) => theme.id === themeLastAction.id));
      }
    }
  }, [themes, themeLastAction, setCurrentTheme]);

  useEffect(() => {
    setCurrentThemeColors(filterAndSortColors);
  }, [currentTheme]);

  function filterAndSortColors() {
    const currentThemeColorsOrder = new Map(currentTheme.colors.map((id, index) => [id, index]));

    const colorsFilteredAndSorted = colors
      .filter((color) => currentThemeColorsOrder.has(color.id))
      .sort((a, b) => currentThemeColorsOrder.get(a.id) - currentThemeColorsOrder.get(b.id));

    return colorsFilteredAndSorted;
  }

  function handleColorCreate(formData) {
    const newColorId = uid();

    setColors([{ id: newColorId, role: formData.role, hex: formData.hex, contrastText: formData.contrastText }, ...colors]);
    setCurrentThemeColors([{ id: newColorId, role: formData.role, hex: formData.hex, contrastText: formData.contrastText }, ...colors]);
    setThemes(themes.map((theme) => (theme.id === currentTheme.id ? { ...theme, colors: [newColorId, ...theme.colors] } : theme)));
    setCurrentTheme({ ...currentTheme, colors: [newColorId, ...currentTheme.colors] });
  }

  function handleColorUpdate(formData) {
    setColors(colors.map((color) => (color.id === formData.id ? { ...color, ...formData } : color)));
    setCurrentThemeColors(colors.map((color) => (color.id === formData.id ? { ...color, ...formData } : color)));
  }

  function handleColorDelete(colorId) {
    setColors(colors.filter((color) => color.id !== colorId));

    const colorsFilteredAndSorted = filterAndSortColors();

    setCurrentThemeColors(colorsFilteredAndSorted.filter((color) => color.id !== colorId));
  }

  function handleColorMove(colorId, index, newIndex) {
    const currentColorId = currentTheme.colors.slice(index, index + 1);
    const colorsWithoutCurrentColorId = [...currentTheme.colors.slice(0, index), ...currentTheme.colors.slice(index + 1)];
    const rearrangedColorIds = [
      ...colorsWithoutCurrentColorId.slice(0, newIndex),
      ...currentColorId,
      ...colorsWithoutCurrentColorId.slice(newIndex),
    ];

    setThemes(themes.map((theme) => (theme.id === currentTheme.id ? { ...theme, colors: rearrangedColorIds } : theme)));
    setCurrentTheme({ ...currentTheme, colors: rearrangedColorIds });
  }

  function handleThemeCreate(formData) {
    const newThemeId = uid();
    setThemes([...themes, { id: newThemeId, colors: [], ...formData }]);
    setThemeFormMode("");
    setThemeLastAction({ type: "add", id: newThemeId });
  }

  function handleThemeUpdate(formData) {
    setThemes(themes.map((theme) => (theme.id === currentTheme.id ? { ...theme, ...formData } : theme)));
    setThemeFormMode("");
  }

  function handleThemeDelete() {
    setThemes(themes.filter((theme) => theme.id !== currentTheme.id));
    setThemeLastAction({ type: "delete", id: currentTheme.id });
    setThemeFormMode("");
  }

  function handleThemeSwitch(targetId) {
    setThemeLastAction({ type: "edit", id: targetId });
  }

  return (
    <>
      <h1>Theme Creator</h1>
      {themeFormMode === "" ? (
        <div className="theme-select">
          <section className="theme-form__section">
            <select onChange={() => handleThemeSwitch(event.target.value)} value={currentTheme.id} className="theme-form__select">
              {themes.map((theme) => (
                <option key={theme.id} value={theme.id}>
                  {theme.name}
                </option>
              ))}
            </select>
            <button className="theme-form__button" onClick={() => setThemeFormMode("create")}>
              add
            </button>
            <button
              className="theme-form__button"
              onClick={() => setThemeFormMode("edit")}
              disabled={currentTheme.id === initialThemes[0].id ? "disabled" : null}
            >
              edit
            </button>
            <button
              className="theme-form__button"
              onClick={() => setThemeFormMode("delete")}
              disabled={currentTheme.id === initialThemes[0].id ? "disabled" : null}
            >
              delete
            </button>
          </section>
        </div>
      ) : (
        <ThemeForm
          theme={currentTheme}
          formMode={themeFormMode}
          onThemeCreate={handleThemeCreate}
          onThemeUpdate={handleThemeUpdate}
          onThemeDelete={handleThemeDelete}
          onThemeCancel={() => setThemeFormMode("")}
        />
      )}
      <ColorForm onColorCreate={handleColorCreate} initialColorData={defaultColorData} submitLabel="add color" />
      <ul className="color-theme">
        {currentThemeColors.length == 0 ? (
          <li className="no-color-card">
            <p>
              No colors... <strong>start by adding one!</strong>
            </p>
          </li>
        ) : (
          currentThemeColors.map((color, i) => (
            <Color
              key={color.id}
              id={color.id}
              role={color.role}
              hex={color.hex}
              contrastText={color.contrastText}
              onColorDelete={handleColorDelete}
              onColorUpdate={handleColorUpdate}
              onColorMove={handleColorMove}
              isFirst={i === 0}
              isLast={i === currentThemeColors.length - 1}
              index={i}
            />
          ))
        )}
      </ul>
    </>
  );
}

export default App;
