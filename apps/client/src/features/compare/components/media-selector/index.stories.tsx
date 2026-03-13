import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import actualMovieService from "../../../movies/services/api-movies.service";
import { MovieMockData } from "../../../../assets/data-test/movies";
import Component from ".";

const apiMoviesService = actualMovieService;
apiMoviesService.search = async () => {
    return { data: [MovieMockData, MovieMockData] } as any;
};
const meta: Meta<typeof Component> = {
    title: "Compare/MediaSelector",
    component: Component,
    args: {
        onSelectA: fn(),
        onSelectB: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MediaSelector: Story = {};
