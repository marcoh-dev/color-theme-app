export type Color = {
	id: string;
	role: string;
	hex: string;
	contrastText: string;
};

export type ColorData = Omit<Color, "id">;

export type Theme = {
	id: string;
	name: string;
	colors: string[];
};

export type ThemeFormMode = "" | "create" | "edit" | "delete";
