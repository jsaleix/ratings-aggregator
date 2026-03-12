import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { MovieMockData } from "../../../../assets/data-test/movies";
import apiMoviesService from "../../services/api-movies.service";
import type { MovieModel } from "../../models/movie";
import Component from "./random-movies";

const mockMovies = new Array(8)
    .fill(MovieMockData)
    .map((m, idx) => ({ ...m, id: idx })) satisfies MovieModel[];

apiMoviesService.getRandom = fn().mockResolvedValue(mockMovies);

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePostersSection/RandomMovies",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RandomMovies: Story = {
    args: {},
};
