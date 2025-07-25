import type { Meta, StoryObj } from "@storybook/react";
import Component from "./signup-form";

const meta: Meta<typeof Component> = {
    title: "Auth/SignupForm",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SignupForm: Story = {};
