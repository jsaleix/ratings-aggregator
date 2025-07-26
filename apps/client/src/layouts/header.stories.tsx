import type { Meta, StoryObj } from "@storybook/react";
import { createContext } from "react";

import Component from "./header";
import { MemoryRouter } from "react-router";

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
                <MemoryRouter>
                    <authCtx.Provider value={{ isConnected }}>
                        <Story />
                    </authCtx.Provider>
                </MemoryRouter>
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
