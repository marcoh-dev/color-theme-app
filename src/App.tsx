import { uid } from "uid";
import useLocalStorageState from "use-local-storage-state";

import Color from "@/components/Color/Color";
import ColorForm from "@/components/ColorForm/ColorForm";
import ThemeForm from "@/components/ThemeForm/ThemeForm";
import { initialColors } from "@/lib/colors";
import { DEFAULT_THEME, initialThemes } from "@/lib/themes";
import type { Color as ColorType, ColorData, Theme, ThemeFormMode } from "@/types";

import "./App.css";

const defaultColorData: ColorData = {
	role: "some color",
	hex: "#000",
	contrastText: "#fff",
};

export default function App() {
	const [colors, setColors] = useLocalStorageState<ColorType[]>("colors", {
		defaultValue: initialColors,
	});
	const [themes, setThemes] = useLocalStorageState<Theme[]>("themes", {
		defaultValue: initialThemes,
	});
	const [currentThemeId, setCurrentThemeId] = useLocalStorageState("currentThemeId", {
		defaultValue: DEFAULT_THEME.id,
	});
	const [themeFormMode, setThemeFormMode] = useLocalStorageState<ThemeFormMode>("themeFormMode", {
		defaultValue: "",
	});

	const currentTheme =
		themes.find((theme) => theme.id === currentThemeId) ?? themes[0] ?? DEFAULT_THEME;
	const currentThemeColors = currentTheme.colors
		.map((colorId) => colors.find((color) => color.id === colorId))
		.filter((color) => color !== undefined);

	function updateCurrentThemeColorIds(update: (colorIds: string[]) => string[]) {
		setThemes(
			themes.map((theme) =>
				theme.id === currentTheme.id ? { ...theme, colors: update(theme.colors) } : theme,
			),
		);
	}

	function handleColorCreate(colorData: ColorData) {
		const newColorId = uid();

		setColors([{ id: newColorId, ...colorData }, ...colors]);
		updateCurrentThemeColorIds((colorIds) => [newColorId, ...colorIds]);
	}

	function handleColorUpdate(updatedColor: ColorType) {
		setColors(
			colors.map((color) =>
				color.id === updatedColor.id ? { ...color, ...updatedColor } : color,
			),
		);
	}

	function handleColorDelete(colorId: string) {
		setColors(colors.filter((color) => color.id !== colorId));
		setThemes(
			themes.map((theme) => ({
				...theme,
				colors: theme.colors.filter((id) => id !== colorId),
			})),
		);
	}

	function handleColorMove(colorId: string, direction: -1 | 1) {
		const colorIds = currentThemeColors.map((color) => color.id);
		const index = colorIds.indexOf(colorId);
		const neighbourId = colorIds[index + direction];

		if (index === -1 || neighbourId === undefined) {
			return;
		}

		colorIds[index] = neighbourId;
		colorIds[index + direction] = colorId;
		updateCurrentThemeColorIds(() => colorIds);
	}

	function handleThemeCreate(name: string) {
		const newThemeId = uid();

		setThemes([...themes, { id: newThemeId, name, colors: [] }]);
		setCurrentThemeId(newThemeId);
		setThemeFormMode("");
	}

	function handleThemeUpdate(name: string) {
		setThemes(
			themes.map((theme) => (theme.id === currentTheme.id ? { ...theme, name } : theme)),
		);
		setThemeFormMode("");
	}

	function handleThemeDelete() {
		const remainingThemes = themes.filter((theme) => theme.id !== currentTheme.id);
		const usedColorIds = new Set(remainingThemes.flatMap((theme) => theme.colors));

		setThemes(remainingThemes);
		setColors(colors.filter((color) => usedColorIds.has(color.id)));
		setCurrentThemeId(DEFAULT_THEME.id);
		setThemeFormMode("");
	}

	const isDefaultTheme = currentTheme.id === DEFAULT_THEME.id;

	return (
		<>
			<h1>Theme Creator</h1>
			{themeFormMode === "" ? (
				<div className="theme-select">
					<section className="theme-form__section">
						<select
							aria-label="Theme"
							onChange={(event) => setCurrentThemeId(event.target.value)}
							value={currentTheme.id}
							className="theme-form__select"
						>
							{themes.map((theme) => (
								<option key={theme.id} value={theme.id}>
									{theme.name}
								</option>
							))}
						</select>
						<button
							className="theme-form__button"
							onClick={() => setThemeFormMode("create")}
						>
							add
						</button>
						<button
							className="theme-form__button"
							onClick={() => setThemeFormMode("edit")}
							disabled={isDefaultTheme}
						>
							edit
						</button>
						<button
							className="theme-form__button"
							onClick={() => setThemeFormMode("delete")}
							disabled={isDefaultTheme}
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
			<ColorForm
				onSubmitColor={handleColorCreate}
				initialColorData={defaultColorData}
				submitLabel="add color"
			/>
			<ul className="color-theme">
				{currentThemeColors.length === 0 ? (
					<li className="no-color-card">
						<p>
							No colors... <strong>start by adding one!</strong>
						</p>
					</li>
				) : (
					currentThemeColors.map((color, index) => (
						<Color
							key={color.id}
							color={color}
							onColorDelete={handleColorDelete}
							onColorUpdate={handleColorUpdate}
							onColorMove={handleColorMove}
							isFirst={index === 0}
							isLast={index === currentThemeColors.length - 1}
						/>
					))
				)}
			</ul>
		</>
	);
}
