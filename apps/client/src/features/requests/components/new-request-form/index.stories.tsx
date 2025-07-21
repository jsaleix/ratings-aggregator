import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Requests/NewRequestForm",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewRequestForm: Story = {
    args: {},
};
