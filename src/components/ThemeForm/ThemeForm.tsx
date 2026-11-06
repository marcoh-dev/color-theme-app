import type { FormEvent, MouseEvent } from "react";

import type { Theme, ThemeFormMode } from "@/types";

import "./ThemeForm.css";

type ThemeFormProps = {
	theme: Theme;
	formMode: ThemeFormMode;
	onThemeCreate: (name: string) => void;
	onThemeUpdate: (name: string) => void;
	onThemeDelete: () => void;
	onThemeCancel: () => void;
};

export default function ThemeForm({
	theme,
	formMode,
	onThemeCreate,
	onThemeUpdate,
	onThemeDelete,
	onThemeCancel,
}: ThemeFormProps) {
	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const name = String(new FormData(event.currentTarget).get("name") ?? "");

		switch (formMode) {
			case "edit":
				onThemeUpdate(name);
				break;
			case "create":
				onThemeCreate(name);
				break;
			case "delete":
				onThemeDelete();
				break;
			default:
				onThemeCancel();
				break;
		}
	}

	function cancelForm(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		onThemeCancel();
	}

	if (formMode === "") {
		return null;
	}

	return (
		<form className="theme-form" autoComplete="off" onSubmit={handleSubmit}>
			<section className="theme-form__section">
				{formMode === "edit" ? (
					<>
						<label className="theme-form__label" htmlFor="name">
							Theme Name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							defaultValue={theme.name}
							className="color-form__input  color-form__input--text"
							required
						/>
						<button className="theme-form__button">update</button>
						<button className="theme-form__button" onClick={cancelForm}>
							cancel
						</button>
					</>
				) : null}
				{formMode === "create" ? (
					<>
						<label className="theme-form__label" htmlFor="name">
							Theme Name:
						</label>
						<input
							type="text"
							id="name"
							name="name"
							className="color-form__input  color-form__input--text"
							required
						/>
						<button className="theme-form__button">create</button>
						<button className="theme-form__button" onClick={cancelForm}>
							cancel
						</button>
					</>
				) : null}
				{formMode === "delete" ? (
					<>
						<button className="theme-form__button">yes delete</button>
						<button className="theme-form__button" onClick={cancelForm}>
							cancel
						</button>
					</>
				) : null}
			</section>
		</form>
	);
}
