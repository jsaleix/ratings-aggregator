import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Component> = {
    title: "Shared/HeaderSearchInput",
    component: Component,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderSearchInput: Story = {
    args: {},
};
