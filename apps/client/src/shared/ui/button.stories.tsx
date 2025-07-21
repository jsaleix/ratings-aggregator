import type { Meta, StoryObj } from "@storybook/react";
import Component from "./button";

const meta: Meta<typeof Component> = {
    title: "Shared/Button",
    component: Component,
    argTypes: {
        variant: {
            options: ["primary", "default"],
            control: { type: "radio" },
        },
        size: {
            options: ["medium", "large"],
            control: { type: "radio" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Button: Story = {
    args: {
        children: "Button",
        size: "medium",
        variant: "primary",
    },
};
