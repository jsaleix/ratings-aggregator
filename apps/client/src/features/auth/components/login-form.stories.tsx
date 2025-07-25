import type { Meta, StoryObj } from "@storybook/react";
import Component from "./login-form";

const meta: Meta<typeof Component> = {
    title: "Auth/Loginform",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Loginform: Story = {};
