import type { Meta, StoryObj } from "@storybook/react";
import MovieListItemComponent from ".";
import { MovieMockData } from "../../../../assets/data-test/movies";

const meta: Meta<typeof MovieListItemComponent> = {
    title: "Movies/MovieListItem",
    component: MovieListItemComponent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieListItem: Story = {
    args: {
        movie: MovieMockData,
    },
};
