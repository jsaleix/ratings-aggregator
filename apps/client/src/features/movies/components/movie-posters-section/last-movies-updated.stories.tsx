import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { MovieMockData } from "../../../../assets/data-test/movies";
import type { PaginatedResult } from "../../../../shared/types/pagination";
import apiMoviesService from "../../services/api-movies.service";
import type { MovieModel } from "../../models/movie";
import Component from "./last-movies-updated";

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
        perPage: 15,
    },
} satisfies PaginatedResult<MovieModel>;

apiMoviesService.getAll = fn().mockResolvedValue(mockData);

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePostersSection/LastMoviesUpdated",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LastMoviesUpdated: Story = {
    args: {},
};
