import type { Meta, StoryObj } from "@storybook/react";
import Component from ".";

const meta: Meta<typeof Component> = {
    title: "General/Home/HomeLogo",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HomeLogo: Story = {};
