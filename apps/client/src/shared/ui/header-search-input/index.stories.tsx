import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Shared/HeaderSearchInput",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderSearchInput: Story = {
    args: {
        test: fn(),
    },
};
