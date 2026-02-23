import type { Meta, StoryObj } from "@storybook/react";
import Component from ".";
import { RatingsSummaryMockData } from "../../../../assets/data-test/ratings-summary";

const meta: Meta<typeof Component> = {
    title: "Movies/MovieSummaryItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Regular: Story = {
    args: { data: RatingsSummaryMockData },
};

export const NoSummary: Story = {
    args: {
        data: { ...RatingsSummaryMockData, content: "" },
    },
};

export const NoScoreValue: Story = {
    args: {
        data: { ...RatingsSummaryMockData, score_value: 0 },
    },
};
