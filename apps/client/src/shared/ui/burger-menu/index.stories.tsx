import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Shared/BurgerMenu",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BurgerMenu: Story = {
    args: {},
};
