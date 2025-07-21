import type { Meta, StoryObj } from "@storybook/react";
import Component from "./requests-list-item";
import { RequestMockData } from "../../../assets/data-test/requests";

const meta: Meta<typeof Component> = {
    title: "Requests/RequestListItem",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RequestListItem: Story = {
    args: {
        request: RequestMockData,
    },
};
