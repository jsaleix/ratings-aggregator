import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";

import { MovieWithSummaryData } from "../../../../assets/data-test/movies";
import apiMoviesService from "../../services/api-movies.service";
import type { MovieWithSummaryModel } from "../../models/movie";
import Component from "./top-movies";

const client = new QueryClient();

const mockMovies = new Array(8)
    .fill(MovieWithSummaryData)
    .map((m, idx) => ({ ...m, id: idx })) satisfies MovieWithSummaryModel[];

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePostersSection/TopMovies",
    component: Component,
    beforeEach: async () => {
        apiMoviesService.getTop = fn().mockResolvedValue(mockMovies);
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

export const TopMovies: Story = {
    args: {},
};
