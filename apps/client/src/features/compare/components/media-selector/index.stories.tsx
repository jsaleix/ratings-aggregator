import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fn } from "@storybook/test";

import actualMovieService from "../../../movies/services/api-movies.service";
import { MovieMockData } from "../../../../assets/data-test/movies";
import Component from ".";

const apiMoviesService = actualMovieService;
apiMoviesService.search = async () => {
    return { data: [MovieMockData, MovieMockData] } as any;
};
const client = new QueryClient();

const meta: Meta<typeof Component> = {
    title: "Compare/MediaSelector",
    component: Component,
    decorators: [
        (Story) => (
            <QueryClientProvider client={client}>
                <Story />
            </QueryClientProvider>
        ),
    ],
    args: {
        compareFn: fn(),
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MediaSelector: Story = {};
