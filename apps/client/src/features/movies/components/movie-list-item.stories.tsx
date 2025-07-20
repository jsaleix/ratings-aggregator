import type { Meta, StoryObj } from "@storybook/react";
import MovieListItemComponent from "./movie-list-item";
import { MovieMockData } from "../../../assets/data-test/movies";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof MovieListItemComponent> = {
    title: "Movies/MovieListItem",
    component: MovieListItemComponent,
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

export const MovieListItem: Story = {
    args: {
        movie: MovieMockData,
    },
};
