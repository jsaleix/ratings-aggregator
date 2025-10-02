import type { Meta, StoryObj } from "@storybook/react";
import Component from "./signup-form";
import { MemoryRouter } from "react-router";

const meta: Meta<typeof Component> = {
    title: "Auth/SignupForm",
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

export const SignupForm: Story = {};
