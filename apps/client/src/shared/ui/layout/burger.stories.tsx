import type { Meta, StoryObj } from "@storybook/react";
import Component from "./burger";

const meta: Meta<typeof Component> = {
    title: "Shared/Layout/Burger",
    component: Component,
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Burger: Story = {
    args: {
        size: 36,
        open: false,
        toggle: () => null,
    },
};
