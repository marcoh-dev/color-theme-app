import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import ContrastCheck from "@/components/ContrastCheck/ContrastCheck";

function respond(overall: string) {
	return new Response(JSON.stringify({ overall }));
}

describe("ContrastCheck", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	it("rates identical colors without asking the API", () => {
		const fetchMock = vi.fn();
		vi.stubGlobal("fetch", fetchMock);

		render(<ContrastCheck firstColor="#000000" secondColor="#000000" />);

		expect(screen.getByText(/Nope/)).toHaveClass("contrast-check--red");
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it("shows the rating from the API", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => respond("Kinda")),
		);

		render(<ContrastCheck firstColor="#000000" secondColor="#ffffff" />);

		expect(screen.getByText(/⌛/)).toBeInTheDocument();
		expect(await screen.findByText(/Kinda/)).toHaveClass("contrast-check--orange");
	});

	it("ignores an outdated response after the colors changed", async () => {
		let resolveFirst: (response: Response) => void = () => {};
		vi.stubGlobal(
			"fetch",
			vi
				.fn()
				.mockImplementationOnce(() => new Promise((resolve) => (resolveFirst = resolve)))
				.mockImplementationOnce(async () => respond("Yup")),
		);

		const { rerender } = render(<ContrastCheck firstColor="#000000" secondColor="#ffffff" />);
		rerender(<ContrastCheck firstColor="#000000" secondColor="#eeeeee" />);

		expect(await screen.findByText(/Yup/)).toBeInTheDocument();

		resolveFirst(respond("Nope"));
		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(screen.getByText(/Yup/)).toBeInTheDocument();
	});

	it("shows an error when the API fails", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("", { status: 500 })),
		);

		render(<ContrastCheck firstColor="#000000" secondColor="#ffffff" />);

		expect(await screen.findByText(/❌/)).toBeInTheDocument();
		expect(screen.getByTitle("HTTP 500: Unknown error")).toBeInTheDocument();
	});
});
