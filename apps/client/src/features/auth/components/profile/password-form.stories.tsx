import type { Meta, StoryObj } from "@storybook/react";
import Component from "./password-form";

const meta: Meta<typeof Component> = {
    title: "Auth/Profile/PasswordForm",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const PasswordForm: Story = {
    args: {
        updatePassword: async () => true,
    },
};
