import type { Meta, StoryObj } from "@storybook/react";
import { TMDBSearchMockData } from "../../../../assets/data-test/tmdb";
import Component from "./index";
import type { TMDBGetMovieType } from "../../types/tmdb";

const meta: Meta<typeof Component> = {
    title: "Requests/TMDBMovieItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const TMDBMovieItem: Story = {
    args: {
        data: TMDBSearchMockData[0] satisfies TMDBGetMovieType,
    },
};
