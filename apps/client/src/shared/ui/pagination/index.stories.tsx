import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";
import type { PaginationType } from "../../types/pagination";

const meta: Meta<typeof Component> = {
    title: "Shared/Pagination",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Pagination: Story = {
    args: {
        data: {
            prev: 1,
            next: 3,
            currentPage: 2,
            total: 15,
            perPage: 5,
        } satisfies PaginationType,
    },
};
