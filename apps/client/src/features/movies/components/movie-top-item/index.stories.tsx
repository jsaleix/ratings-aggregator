import type { Meta, StoryObj } from "@storybook/react";

import Component from ".";
import { MovieWithSummaryData } from "../../../../assets/data-test/movies";

const meta: Meta<typeof Component> = {
    title: "Movies/MovieTopItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieTopItem: Story = {
    args: {
        movie: MovieWithSummaryData,
        index: 1,
    },
};
