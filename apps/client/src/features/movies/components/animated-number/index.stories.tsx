import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Movies/AnimatedNumber",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AnimatedNumber: Story = {
    args: {
        value: 66,
        onEnd: fn(),
        onUpdate: fn(),
        duration: 4,
        className: "text-8xl",
    },
};
