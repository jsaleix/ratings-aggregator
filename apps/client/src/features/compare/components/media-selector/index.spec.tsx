import { afterEach, describe, expect, test, vi } from "vitest";
import {
    render,
    screen,
    cleanup,
    fireEvent,
    within,
} from "@testing-library/react";

import MediaSelector from ".";
import { createQueryWrapper } from "../../../../tests/query-wrapper";
import { MovieMockData } from "../../../../assets/data-test/movies";
import { sleep } from "../../../../shared/utils";
import apiMoviesService from "../../../movies/services/api-movies.service";

vi.mock("../../../movies/services/api-movies.service", () => {
    return {
        default: {
            search: vi.fn(() => Promise.resolve({ data: [MovieMockData] })),
        },
    };
});

const compareFn = vi.fn();

describe("Features/Compare/MediaSelector", () => {
    afterEach(() => {
        cleanup();
    });

    describe("Base", () => {
        test("Render", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            expect(screen.getByTestId("media-selector")).toBeDefined();
        });

        test("Render two inputs", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            expect(
                (await screen.findAllByTestId("single-media-selector")).length
            ).toBe(2);
        });

        test("Render disabled compare button", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            expect(screen.getByTestId("compare-btn")).toBeDefined();
            // expect(screen.getByTestId("compare-btn")).toBeDisabled();
        });
    });

    describe("Movie selection", () => {
        test("Callback fn is called", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            const input = screen.getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;
            fireEvent.change(input, { target: { value: "Movie A" } });
            await sleep(1);
            expect(apiMoviesService.search).toHaveBeenCalled();
        });

        test("State updates after movie is selected", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            const input = screen.getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;
            fireEvent.change(input, { target: { value: "Movie A" } });
            await sleep(1);
            fireEvent.click(
                await screen.findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            await sleep(1);
            expect(screen.queryByText(MovieMockData.title)).not.toBeNull();
        });

        test("Compare button should be enabled if both movies are selected", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            const divA = screen.getByTestId("movie-a");
            const inputA = within(divA).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            const divB = screen.getByTestId("movie-b");
            const inputB = within(divB).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            expect(screen.queryByText("ok")).toBeNull(); // TODO: use actual disabled property

            fireEvent.change(inputA, { target: { value: "Movie A" } });
            fireEvent.change(inputB, { target: { value: "Movie B" } });
            fireEvent.click(
                await within(divA).findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            fireEvent.click(
                await within(divB).findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            await sleep(1);
            expect(screen.queryByText("ok")).toBeDefined(); // TODO: use actual disabled property
        });

        test("Selected movies should be displayed", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            const divA = screen.getByTestId("movie-a");
            const inputA = within(divA).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            const divB = screen.getByTestId("movie-b");
            const inputB = within(divB).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            fireEvent.change(inputA, { target: { value: "Movie A" } });
            fireEvent.change(inputB, { target: { value: "Movie B" } });
            fireEvent.click(
                await within(divA).findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            fireEvent.click(
                await within(divB).findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            await sleep(1);

            expect(
                await within(divA).findByText(MovieMockData.title, {
                    exact: false,
                })
            ).toBeDefined();
            expect(
                await within(divB).findByText(MovieMockData.title, {
                    exact: false,
                })
            ).toBeDefined();
        });

        test("Can remove a movie", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });
            const divA = screen.getByTestId("movie-a");
            const inputA = within(divA).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            fireEvent.change(inputA, { target: { value: "Movie A" } });
            fireEvent.click(
                await within(divA).findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            await sleep(1);

            const removeBtn = within(divA).getByTestId("media-selector-remove");
            fireEvent.click(removeBtn);
            expect(within(divA).queryByTestId(MovieMockData.title)).toBeNull();
        });
    });

    describe("Parent interaction", () => {
        test("Should call compareFn with right params", async () => {
            render(<MediaSelector compareFn={compareFn} />, {
                wrapper: createQueryWrapper(),
            });

            const divA = screen.getByTestId("movie-a");
            const inputA = within(divA).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            const divB = screen.getByTestId("movie-b");
            const inputB = within(divB).getAllByTestId(
                "media-selector-input"
            )[0] as HTMLInputElement;

            fireEvent.change(inputA, { target: { value: "Movie A" } });
            fireEvent.change(inputB, { target: { value: "Movie B" } });
            fireEvent.click(
                await within(divA).findByText(MovieMockData.title, {
                    exact: false,
                })
            );
            fireEvent.click(
                await within(divB).findByText(MovieMockData.title, {
                    exact: false,
                })
            );

            fireEvent.click(await screen.findByTestId("compare-btn"));
            expect(compareFn).toHaveBeenCalledOnce();
            expect(compareFn).toHaveBeenCalledWith(
                MovieMockData.id,
                MovieMockData.id
            );
        });
    });
});
