import type { Meta, StoryObj } from "@storybook/react";

import Component from ".";

const meta: Meta<typeof Component> = {
    title: "Movies/GenresLabelsPart",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GenresLabelsPart: Story = {
    args: {
        genres: [
            {
                id: "1",
                name: "Mystery",
                tmdb_id: "1",
            },
            {
                id: "2",
                name: "Crime",
                tmdb_id: "2",
            },
            {
                id: "3",
                name: "Fantasy",
                tmdb_id: "3",
            },
        ],
        labelSize: "medium"
    },
};
