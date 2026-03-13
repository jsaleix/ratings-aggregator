import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Requests/NewRequestPremiumForm",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewRequestPremiumForm: Story = {
    args: {
        label: "Create new request",
    },
};
