import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import Component from "./";
import { DEFAULT_FILTERS } from "../../hooks/use-filters";

const meta: Meta<typeof Component> = {
    title: "Movies/MoviesFilters",
    component: Component,
    args: {
        filters: DEFAULT_FILTERS,
        changeOrder: fn(),
        changeOrderBy: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MoviesFilters: Story = {
    args: {},
};
