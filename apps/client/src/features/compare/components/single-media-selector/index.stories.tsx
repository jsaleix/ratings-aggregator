import type { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { sleep } from "../../../../shared/utils";
import type { MovieModel } from "../../../movies/types/movie";
import { MovieMockData } from "../../../../assets/data-test/movies";
import Component from ".";

const client = new QueryClient();

const searchFn = async (str: string): Promise<MovieModel[]> => {
    if (!str) return [];
    await sleep(1);
    return [MovieMockData];
};

const meta: Meta<typeof Component> = {
    title: "Compare/SingleMediaSelector",
    component: Component,
    decorators: [
        (Story) => (
            <QueryClientProvider client={client}>
                <Story />
            </QueryClientProvider>
        ),
    ],
    args: {
        searchFn,
        onSelect: () => null,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMediaSelector: Story = {};
