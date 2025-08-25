import type { Meta, StoryObj } from "@storybook/react";
import Component from ".";
import { RatingsSummaryMockData } from "../../../../assets/data-test/ratings-summary";

const meta: Meta<typeof Component> = {
    title: "Movies/MovieSummaryItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieSummaryItem: Story = {
    args: { data: RatingsSummaryMockData },
};
