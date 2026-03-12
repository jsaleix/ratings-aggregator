import { createContext } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import Component from "./header";

const authCtx = createContext({});

const meta: Meta<typeof Component> = {
    title: "Layout/Header",
    component: Component,
    argTypes: {
        isConnected: Boolean,
    },
    decorators: [
        (Story, { args }) => {
            const { isConnected } = args as { isConnected: boolean };
            return (
                <authCtx.Provider value={{ isConnected }}>
                    <Story />
                </authCtx.Provider>
            );
        },
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {
    args: {
        isConnected: true,
    },
};
