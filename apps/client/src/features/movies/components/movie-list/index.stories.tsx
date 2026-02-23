import type { Meta, StoryObj } from "@storybook/react";
import { MemoryRouter } from "react-router";

import MovieListComponent from ".";
import { MovieMockData } from "../../../../assets/data-test/movies";

const meta: Meta<typeof MovieListComponent> = {
    title: "Movies/MovieList",
    component: MovieListComponent,
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

export const MovieList: Story = {
    args: {
        movies: [MovieMockData, MovieMockData, MovieMockData],
    },
};
