import type { Meta, StoryObj } from "@storybook/react";
import Component from "./delete-part";

const meta: Meta<typeof Component> = {
    title: "Auth/Profile/DeletePart",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DeletePart: Story = {
    args: { deleteAction: async () => true },
};
