import { afterEach, describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";

import SingleMediaSelector from ".";
import { sleep } from "../../../../shared/utils";
import { createQueryWrapper } from "../../../../tests/query-wrapper";
import type { MovieModel } from "../../../movies/types/movie";
import { MovieMockData } from "../../../../assets/data-test/movies";

const searchFn = async (str: string): Promise<MovieModel[]> => {
    if (!str) return [];
    await sleep(1);
    return [MovieMockData];
};

describe("Features/Compare/SingleMediaSelector", () => {
    afterEach(() => {
        cleanup();
    });

    test("Renders", async () => {
        render(
            <SingleMediaSelector searchFn={searchFn} onSelect={() => null} />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        expect(
            await screen.findByTestId("single-media-selector")
        ).toBeDefined();
    });

    test("Should returns an input", () => {
        render(
            <SingleMediaSelector searchFn={searchFn} onSelect={() => null} />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        expect(screen.getByTestId("media-selector-input")).toBeDefined();
    });

    test("Should type in the input", () => {
        render(
            <SingleMediaSelector searchFn={searchFn} onSelect={() => null} />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        const input = screen.getByTestId(
            "media-selector-input"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Movie A" } });

        expect(input.value).toBe("Movie A");
    });

    test("Should call searchFn props", async () => {
        const searchFnMock = vi.fn(async () => [MovieMockData]);

        render(
            <SingleMediaSelector
                searchFn={searchFnMock}
                onSelect={() => null}
            />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        const input = screen.getByTestId(
            "media-selector-input"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Movie A" } });
        await sleep(1);
        expect(searchFnMock).toHaveBeenCalled();
        expect(searchFnMock).toHaveBeenCalledWith("Movie A");
    });

    test("Should call searchFn only once typing is paused", async () => {
        const searchFnMock = vi.fn(async () => [MovieMockData]);

        render(
            <SingleMediaSelector
                searchFn={searchFnMock}
                onSelect={() => null}
            />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        const input = screen.getByTestId(
            "media-selector-input"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "M" } });
        fireEvent.change(input, { target: { value: "Mo" } });
        fireEvent.change(input, { target: { value: "Mov" } });
        fireEvent.change(input, { target: { value: "Movi" } });
        fireEvent.change(input, { target: { value: "Movie" } });
        fireEvent.change(input, { target: { value: "Movie A" } });
        await sleep(2);
        expect(searchFnMock).toHaveBeenCalledOnce();
    });

    test("Should display results after typing on input", async () => {
        render(
            <SingleMediaSelector searchFn={searchFn} onSelect={() => null} />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        const input = screen.getByTestId(
            "media-selector-input"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Movie A" } });
        fireEvent.change(input, { target: { value: "M" } });
        fireEvent.change(input, { target: { value: "Mo" } });
        fireEvent.change(input, { target: { value: "Mov" } });
        fireEvent.change(input, { target: { value: "Movi" } });
        fireEvent.change(input, { target: { value: "Movie" } });
        fireEvent.change(input, { target: { value: "Movie A" } });
        await sleep(2);
        expect(screen.getByTestId("results-list")).toBeDefined();
        expect(screen.queryByText(MovieMockData.title)).not.toBeNull();
    });

    test("Should select a movie by clicking it and clear results", async () => {
        render(
            <SingleMediaSelector searchFn={searchFn} onSelect={() => null} />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        const input = screen.getByTestId(
            "media-selector-input"
        ) as HTMLInputElement;

        // Fill the input
        fireEvent.change(input, { target: { value: "Movie A" } });
        expect(input.value).toBe("Movie A");

        // Wait for the request
        await sleep(2);

        // Renders list
        expect(screen.queryByTestId("results-list")).toBeDefined();

        // Click on the first element
        const movieElement = await screen.findByText(MovieMockData.title);
        fireEvent.click(movieElement);
        await sleep(1);

        expect(input.value).toBe("");
        expect(screen.queryByTestId("results-list")).toBe(null);
    });

    test("Should trigger callback fn with selected movie", async () => {
        const onSelectFn = vi.fn((_: MovieModel) => null);

        render(
            <SingleMediaSelector searchFn={searchFn} onSelect={onSelectFn} />,
            {
                wrapper: createQueryWrapper(),
            }
        );
        const input = screen.getByTestId(
            "media-selector-input"
        ) as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Movie A" } });
        await sleep(2);
        const movieElement = await screen.findByText(MovieMockData.title);
        fireEvent.click(movieElement);

        expect(onSelectFn).toHaveBeenCalled();
        expect(onSelectFn).toHaveBeenLastCalledWith(MovieMockData);
    });
});
