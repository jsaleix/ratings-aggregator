import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";
import { MemoryRouter } from "react-router";
import { fn } from "storybook/test";

const meta: Meta<typeof Component> = {
    title: "Shared/HeaderSearchInput",
    component: Component,
    decorators: [
        (Story, { args }) => {
            return (
                <MemoryRouter>
                    <Story {...args} />
                </MemoryRouter>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderSearchInput: Story = {
    args: {
        test: fn(),
    },
};
