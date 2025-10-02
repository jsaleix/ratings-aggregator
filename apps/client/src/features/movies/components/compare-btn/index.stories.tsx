import type { Meta, StoryObj } from "@storybook/react";

import Component from ".";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Component> = {
    title: "Movies/CompareBtn",
    component: Component,
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div style={{ width: "100vw", height: "100vh" }}>
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
    args: { movieId: "123" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const CompareBtn: Story = {};
