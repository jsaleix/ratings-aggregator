import type { Meta, StoryObj } from "@storybook/react";
import Component from "./logout-part";

const meta: Meta<typeof Component> = {
    title: "Auth/Profile/LogoutPart",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LogoutPart: Story = {
    args: {
        logout: async () => true,
    },
};
