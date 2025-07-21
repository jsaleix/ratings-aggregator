import type { Meta, StoryObj } from "@storybook/react";
import Component from "./movie-rating-item";
import { RatingMockData } from "../../../assets/data-test/ratings";

const meta: Meta<typeof Component> = {
    title: "Movies/MovieRatingItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieRatingItem: Story = {
    args: {
        rating: RatingMockData,
    },
};
