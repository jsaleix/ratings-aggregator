import type { Meta, StoryObj } from "@storybook/react";
import Component from "./index";

const meta: Meta<typeof Component> = {
    title: "Shared/Table",
    component: Component,
};

export default meta;

const data = [
    { id: 1, name: "Alice", role: "Admin", status: "Active" },
    { id: 2, name: "Bob", role: "User", status: "Inactive" },
    { id: 3, name: "John", role: "User", status: "Inactive" },
];

// type DataType = { id: number; name: string; role: string; status: string };
type DataType = (typeof data)[0];

type Story = StoryObj<typeof Component<DataType>>;
export const Table: Story = {
    args: {
        columns: [
            { header: <input type="checkbox" />, key: "check_all" },
            { header: "User", key: "name" },
            { header: "Role", key: "role" },
            { header: "Status", key: "status" },
        ],
        data,
        renderRow: (data, idx) => (
            <Component.Row idx={idx}>
                <Component.Cell>
                    <input type="checkbox" />
                </Component.Cell>
                <Component.Cell>{data.name}</Component.Cell>
                <Component.Cell>{data.role}</Component.Cell>
                <Component.Cell>{data.status}</Component.Cell>
            </Component.Row>
        ),
    },
};
