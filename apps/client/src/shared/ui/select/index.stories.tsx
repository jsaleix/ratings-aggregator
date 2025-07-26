import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Shared/Select",
    component: Component,
    argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Select: Story = {
    args: {
        children: (
            <>
                <option>Option A</option>
                <option>Option B</option>
            </>
        ),
    },
};
