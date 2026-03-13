import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { MovieWithSummaryData } from "../../../../assets/data-test/movies";
import apiMoviesService from "../../services/api-movies.service";
import type { MovieWithSummaryModel } from "../../models/movie";
import Component from "./top-movies";

const mockMovies = new Array(8)
    .fill(MovieWithSummaryData)
    .map((m, idx) => ({ ...m, id: idx })) satisfies MovieWithSummaryModel[];

apiMoviesService.getTop = fn().mockResolvedValue(mockMovies);

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePostersSection/TopMovies",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TopMovies: Story = {
    args: {},
};
