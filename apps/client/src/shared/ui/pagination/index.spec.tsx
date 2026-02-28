import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";

import Pagination from ".";
import type { PaginationType } from "../../types/pagination";

const baseProps = {
    currentPage: 1,
    total: 3,
    next: null,
    prev: null,
    perPage: 15,
} satisfies PaginationType;

describe("Shared/UI/Pagination", () => {
    afterEach(() => {
        cleanup();
    });

    describe("Rendering", () => {
        it("Render", () => {
            const { getByTestId } = render(<Pagination data={baseProps} />);
            expect(getByTestId("pagination")).toBeDefined();
        });
        it("Render the 4 buttons", async () => {
            const { getByTestId } = render(<Pagination data={baseProps} />);
            expect(getByTestId("pagination-first")).toBeDefined();
            expect(getByTestId("pagination-last")).toBeDefined();
            expect(getByTestId("pagination-next")).toBeDefined();
            expect(getByTestId("pagination-previous")).toBeDefined();
        });
    });

    describe("Enabled/Disabled logic", () => {
        it("Every button should be disabled", async () => {
            const { getByTestId } = render(<Pagination data={baseProps} />);
            expect(getByTestId("pagination-first")).toBeDisabled();
            expect(getByTestId("pagination-last")).toBeDisabled();
            expect(getByTestId("pagination-previous")).toBeDisabled();
            expect(getByTestId("pagination-next")).toBeDisabled();
        });

        it("First and Previous should be disabled but not last and next", async () => {
            const props = {
                prev: null,
                currentPage: 1,
                next: 2,
                total: 30,
                perPage: 15,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-first")).toBeDisabled();
            expect(getByTestId("pagination-previous")).toBeDisabled();
            expect(getByTestId("pagination-last")).toBeEnabled();
            expect(getByTestId("pagination-next")).toBeEnabled();
        });

        it("First and Previous should be enabled but not next and last", async () => {
            const props = {
                prev: 1,
                next: null,
                currentPage: 2,
                total: 10,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-first")).toBeEnabled();
            expect(getByTestId("pagination-previous")).toBeEnabled();
            expect(getByTestId("pagination-last")).toBeDisabled();
            expect(getByTestId("pagination-next")).toBeDisabled();
        });
    });

    describe("onPageChange callback", () => {
        it("Should call next with the right parameter", () => {
            const props = {
                prev: 1,
                next: 3,
                currentPage: 2,
                total: 15,
                perPage: 5,
            } satisfies PaginationType;
            const onPageChange = vi.fn();
            const { getByTestId } = render(
                <Pagination data={props} onPageChange={onPageChange} />,
            );
            fireEvent.click(getByTestId("pagination-next"));
            expect(onPageChange).toHaveBeenCalledWith(3);
        });
        it("Should call previous with the right parameter", () => {
            const props = {
                prev: 1,
                next: 3,
                currentPage: 2,
                total: 15,
                perPage: 5,
            } satisfies PaginationType;
            const onPageChange = vi.fn();
            const { getByTestId } = render(
                <Pagination data={props} onPageChange={onPageChange} />,
            );
            fireEvent.click(getByTestId("pagination-previous"));
            expect(onPageChange).toHaveBeenCalledWith(1);
        });
        it("Should call last with the right parameter", () => {
            const props = {
                prev: 1,
                next: 3,
                currentPage: 2,
                total: 15,
                perPage: 5,
            } satisfies PaginationType;
            const onPageChange = vi.fn();
            const { getByTestId } = render(
                <Pagination data={props} onPageChange={onPageChange} />,
            );
            fireEvent.click(getByTestId("pagination-last"));
            expect(onPageChange).toHaveBeenCalledWith(3);
        });
        it("Should call first with the right parameter", () => {
            const props = {
                prev: 1,
                next: 3,
                currentPage: 2,
                total: 15,
                perPage: 5,
            } satisfies PaginationType;
            const onPageChange = vi.fn();
            const { getByTestId } = render(
                <Pagination data={props} onPageChange={onPageChange} />,
            );
            fireEvent.click(getByTestId("pagination-first"));
            expect(onPageChange).toHaveBeenCalledWith(1);
        });
        it("Should call first with the right parameter", () => {
            const props = {
                total: 19,
                currentPage: 2,
                perPage: 5,
                prev: 1,
                next: 3,
            } satisfies PaginationType;
            const onPageChange = vi.fn();
            const { getByTestId } = render(
                <Pagination data={props} onPageChange={onPageChange} />,
            );
            fireEvent.click(getByTestId("pagination-next"));
            expect(onPageChange).toHaveBeenCalledWith(3);
            fireEvent.click(getByTestId("pagination-last"));
            expect(onPageChange).toHaveBeenCalledWith(4);
        });
    });

    describe("Right label", () => {
        it("Should display right label", () => {
            const props = {
                prev: 0,
                next: 2,
                currentPage: 1,
                total: 10,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-label").textContent).toContain(
                "1 to 5 of 10",
            );
        });
        it("Should display right label", () => {
            const props = {
                prev: 1,
                next: null,
                currentPage: 2,
                total: 10,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-label").textContent).toContain(
                "6 to 10 of 10",
            );
        });
        it("Should display right label", () => {
            const props = {
                prev: 1,
                next: null,
                currentPage: 1,
                total: 4,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-label").textContent).toContain(
                "1 to 4 of 4",
            );
        });
        it("Should display right label", () => {
            const props = {
                prev: 1,
                next: null,
                currentPage: 1,
                total: 5,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-label").textContent).toContain(
                "1 to 5 of 5",
            );
        });

        it("Should display right label", () => {
            const props = {
                prev: 1,
                next: null,
                currentPage: 2,
                total: 9,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-label").textContent).toContain(
                "6 to 9 of 9",
            );
        });

        it("Should display right label", () => {
            const props = {
                prev: null,
                next: null,
                currentPage: 1,
                total: 0,
                perPage: 5,
            } satisfies PaginationType;
            const { getByTestId } = render(<Pagination data={props} />);
            expect(getByTestId("pagination-label").textContent).toContain(
                "0 to 0 of 0",
            );
        });
    });
});
