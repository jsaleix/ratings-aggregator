import type { Meta, StoryObj } from "@storybook/react";
import Component from ".";

const meta: Meta<typeof Component> = {
    title: "Movies/MoviePageSkeleton",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MoviePageSkeleton: Story = {
    args: {},
};
