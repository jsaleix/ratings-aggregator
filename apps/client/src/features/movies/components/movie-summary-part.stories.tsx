import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import Component from "./movie-summary-part";
import { RatingsSummaryMockData } from "../../../assets/data-test/ratings-summary";

const meta: Meta<typeof Component> = {
    title: "Movies/MovieSummaryPart",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MovieSummaryPart: Story = {
    args: {
        summary: RatingsSummaryMockData,
        adminOptions: true,
        deleteAction: fn(),
    },
};
