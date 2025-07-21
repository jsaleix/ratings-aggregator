import { Meta, StoryObj } from "@storybook/react";
import Component from ".";

const meta: Meta<typeof Component> = {
    component: Component,
    title: "Shared/UnderlinedItem",
    decorators: [
        (Story) => (
            <div className="w-60 flex flex-col">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Vitae, at possimus est libero nam non incidunt aut molestiae
                    voluptatem sapiente, laborum consequatur suscipit doloremque
                    dolore perferendis impedit harum ipsum animi!
                </p>
                <Story />
            </div>
        ),
    ],
    parameters: { layout: "centered" },
    tags: [],
    args: { children: <p className="font-bold">What's up?</p>, className: "px-1 w-fit leading-none" },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UnderlinedItem: Story = {};
