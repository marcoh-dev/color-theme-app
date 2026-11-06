import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

function colorCards() {
	return screen.getAllByRole("listitem");
}

function roles() {
	return colorCards().map((card) => card.querySelector(".color-card__role")?.textContent);
}

describe("App", () => {
	beforeEach(() => {
		localStorage.clear();
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response(JSON.stringify({ overall: "Yup" }))),
		);
	});

	it("shows the colors of the default theme", () => {
		render(<App />);

		expect(colorCards()).toHaveLength(9);
		expect(roles()[0]).toBe("primary main");
	});

	it("adds a color to the current theme", async () => {
		const user = userEvent.setup();
		render(<App />);

		const [roleInput] = screen.getAllByLabelText("Role");
		await user.clear(roleInput!);
		await user.type(roleInput!, "accent");
		await user.click(screen.getByRole("button", { name: "add color" }));

		expect(colorCards()).toHaveLength(10);
		expect(roles()[0]).toBe("accent");
	});

	it("updates a color without showing colors of other themes", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "add" }));
		await user.type(screen.getByLabelText("Theme Name:"), "Second");
		await user.click(screen.getByRole("button", { name: "create" }));

		const [roleInput] = screen.getAllByLabelText("Role");
		await user.clear(roleInput!);
		await user.type(roleInput!, "only color");
		await user.click(screen.getByRole("button", { name: "add color" }));

		await user.click(within(colorCards()[0]!).getByRole("button", { name: "Edit" }));
		const editRoleInput = within(colorCards()[0]!).getByLabelText("Role");
		await user.clear(editRoleInput);
		await user.type(editRoleInput, "renamed");
		await user.click(screen.getByRole("button", { name: "update color" }));

		expect(roles()).toEqual(["renamed"]);
	});

	it("deletes a color after confirmation", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(within(colorCards()[0]!).getByRole("button", { name: "Delete" }));
		await user.click(within(colorCards()[0]!).getByRole("button", { name: "Delete" }));

		expect(colorCards()).toHaveLength(8);
		expect(roles()[0]).toBe("primary dark");
	});

	it("moves a color down and up", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(within(colorCards()[0]!).getByRole("button", { name: "Move color down" }));
		expect(roles().slice(0, 2)).toEqual(["primary dark", "primary main"]);

		await user.click(within(colorCards()[1]!).getByRole("button", { name: "Move color up" }));
		expect(roles().slice(0, 2)).toEqual(["primary main", "primary dark"]);
	});

	it("creates, switches and deletes themes", async () => {
		const user = userEvent.setup();
		render(<App />);

		await user.click(screen.getByRole("button", { name: "add" }));
		await user.type(screen.getByLabelText("Theme Name:"), "Second");
		await user.click(screen.getByRole("button", { name: "create" }));

		const themeSelect = screen.getByRole("combobox", { name: "Theme" });
		expect(themeSelect).toHaveDisplayValue("Second");
		expect(screen.getByText(/No colors/)).toBeInTheDocument();

		await user.selectOptions(themeSelect, "Default Theme");
		expect(colorCards()).toHaveLength(9);

		await user.selectOptions(themeSelect, "Second");
		await user.click(screen.getByRole("button", { name: "delete" }));
		await user.click(screen.getByRole("button", { name: "yes delete" }));

		expect(screen.getByRole("combobox", { name: "Theme" })).toHaveDisplayValue("Default Theme");
		expect(screen.queryByRole("option", { name: "Second" })).not.toBeInTheDocument();
	});
});
