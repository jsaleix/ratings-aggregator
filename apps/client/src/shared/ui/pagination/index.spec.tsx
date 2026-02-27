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
            expect(getByTestId("first")).toBeDefined();
            expect(getByTestId("last")).toBeDefined();
            expect(getByTestId("next")).toBeDefined();
            expect(getByTestId("previous")).toBeDefined();
        });
    });

    describe("Enabled/Disabled logic", () => {
        it("Every button should be disabled", async () => {
            const { getByTestId } = render(<Pagination data={baseProps} />);
            expect(getByTestId("first")).toBeDisabled();
            expect(getByTestId("last")).toBeDisabled();
            expect(getByTestId("previous")).toBeDisabled();
            expect(getByTestId("next")).toBeDisabled();
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
            expect(getByTestId("first")).toBeDisabled();
            expect(getByTestId("previous")).toBeDisabled();
            expect(getByTestId("last")).toBeEnabled();
            expect(getByTestId("next")).toBeEnabled();
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
            expect(getByTestId("first")).toBeEnabled();
            expect(getByTestId("previous")).toBeEnabled();
            expect(getByTestId("last")).toBeDisabled();
            expect(getByTestId("next")).toBeDisabled();
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
            fireEvent.click(getByTestId("next"));
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
            fireEvent.click(getByTestId("previous"));
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
            fireEvent.click(getByTestId("last"));
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
            fireEvent.click(getByTestId("first"));
            expect(onPageChange).toHaveBeenCalledWith(1);
        });
    });
});
