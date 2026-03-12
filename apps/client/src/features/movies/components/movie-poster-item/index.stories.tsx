import type { Meta, StoryObj } from "@storybook/react";

import Component from ".";
import { MovieMockData } from "../../../../assets/data-test/movies";

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePosterItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MoviePosterItem: Story = {
    args: {
        movie: MovieMockData,
    },
};
