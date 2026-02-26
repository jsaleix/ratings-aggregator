import type { Meta, StoryObj } from "@storybook/react";

import Component from ".";

const meta: Meta<typeof Component> = {
    title: "Movies/GenreLabelItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const GenreLabelItem: Story = {
    args: {
        genre: {
            id: "1",
            name: "Mystery",
            tmdb_id: "1",
        },
        size: "small",
    },
};
