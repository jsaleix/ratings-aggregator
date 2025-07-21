import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Shared/Input",
    component: Component,
    argTypes: {
        variant: {
            options: ["default", "dark", "secondary"],
            control: { type: "radio" },
        },
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Input: Story = {
    args: {
        placeholder: "Type your text here",
        name: "test-id",
        variant: "default",
    },
};
