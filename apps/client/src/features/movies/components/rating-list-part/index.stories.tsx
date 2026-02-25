import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { RatingMockData } from "../../../../assets/data-test/ratings";
import Component from ".";

const meta: Meta<typeof Component> = {
    title: "Movies/MovieRatingListPart",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieRatingListPart: Story = {
    args: {
        ratings: [RatingMockData, RatingMockData, RatingMockData],
        adminOptions: true,
        deleteAction: fn(),
    },
};
