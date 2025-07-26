import type { Meta, StoryObj } from "@storybook/react";
import Component from "./pros-parts";

const meta: Meta<typeof Component> = {
    title: "Auth/ProsPart",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ProsPart: Story = {};
