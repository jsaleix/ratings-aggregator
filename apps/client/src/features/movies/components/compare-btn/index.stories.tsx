import type { Meta, StoryObj } from "@storybook/react";

import Component from ".";

const meta: Meta<typeof Component> = {
    title: "Movies/CompareBtn",
    component: Component,
    decorators: [
        (Story) => (
            <div style={{ width: "100vw", height: "100vh" }}>
                <Story />
            </div>
        ),
    ],
    args: { movieId: "123" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompareBtn: Story = {};
