import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const client = new QueryClient();

const meta: Meta<typeof Component> = {
    title: "Requests/NewRequestPremiumForm",
    component: Component,
    decorators: [
        (Story) => (
            <QueryClientProvider client={client}>
                <Story />
            </QueryClientProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NewRequestPremiumForm: Story = {
    args: {
        label: "Create new request",
    },
};
