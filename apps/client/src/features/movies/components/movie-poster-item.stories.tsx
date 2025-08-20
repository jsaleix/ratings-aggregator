import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";

import Component from "./movie-poster-item";
import { MovieMockData } from "../../../assets/data-test/movies";

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePosterItem",
    component: Component,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MoviePosterItem: Story = {
    args: {
        movie: MovieMockData,
    },
};
