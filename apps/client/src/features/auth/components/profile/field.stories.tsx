import type { Meta, StoryObj } from "@storybook/react";
import Component from "./field";
import Input from "../../../../shared/ui/input";

const meta: Meta<typeof Component> = {
    title: "Auth/Profile/Field",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Field: Story = {
    args: {
        name: "Title",
        subTitle:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque mollitia quis cupiditate, numquam dolorem ab reprehenderit accusamus minus ex quas pariatur necessitatibus excepturi sint voluptatum blanditiis ducimus aliquam recusandae quibusdam.",
        children: (
            <div className="flex flex-col gap-3">
                <Input type="text" placeholder="Placeholder"/>
                <Input type="text" placeholder="Placeholder"/>
            </div>
        ),
    },
};
