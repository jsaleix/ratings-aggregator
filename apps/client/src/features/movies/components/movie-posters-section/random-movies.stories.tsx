import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

import { MovieMockData } from "../../../../assets/data-test/movies";
import apiMoviesService from "../../services/api-movies.service";
import type { MovieModel } from "../../models/movie";
import Component from "./random-movies";

const client = new QueryClient();

const mockMovies = new Array(8)
    .fill(MovieMockData)
    .map((m, idx) => ({ ...m, id: idx })) satisfies MovieModel[];

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePostersSection/RandomMovies",
    component: Component,
    beforeEach: async () => {
        apiMoviesService.getRandom = fn().mockResolvedValue(mockMovies);
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <Story />
                </MemoryRouter>
            </QueryClientProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RandomMovies: Story = {
    args: {},
};
