import type { Meta, StoryObj } from "@storybook/react";
import Component from "./last-movies-added";
import { fn } from "@storybook/test";
import apiMoviesService from "../services/api-movies.service";
import type { PaginatedResult } from "../../../shared/types/pagination";
import type { MovieModel } from "../types/movie";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import { MovieMockData } from "../../../assets/data-test/movies";

const client = new QueryClient();

const movies = new Array(8)
    .fill(MovieMockData)
    .map((m, idx) => ({ ...m, id: idx })) satisfies MovieModel[];

const mockData = {
    data: movies,
    pagination: {
        total: movies.length,
        currentPage: 1,
        next: null,
        prev: null,
    },
} satisfies PaginatedResult<MovieModel>;

const meta: Meta<typeof Component> = {
    title: "Movies/LastMoviesAdded",
    component: Component,
    beforeEach: async () => {
        apiMoviesService.getAll = fn().mockResolvedValue(mockData);
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

export const LastMoviesAdded: Story = {
    args: {},
};
