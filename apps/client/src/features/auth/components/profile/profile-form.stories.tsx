import type { Meta, StoryObj } from "@storybook/react";
import Component from "./profile-form";

const meta: Meta<typeof Component> = {
    title: "Auth/Profile/ProfileForm",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const ProfileForm: Story = {
    args: {
        updateAction: async () => true,
    },
};
