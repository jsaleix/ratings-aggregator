import type { Meta, StoryObj } from "@storybook/react";

import { sleep } from "../../../../shared/utils";
import type { MovieModel } from "../../../movies/models/movie";
import { MovieMockData } from "../../../../assets/data-test/movies";
import Component from ".";

const searchFn = async (str: string): Promise<MovieModel[]> => {
    if (!str) return [];
    await sleep(1);
    return [MovieMockData, MovieMockData];
};

const meta: Meta<typeof Component> = {
    title: "Compare/SingleMediaSelector",
    component: Component,
    args: {
        searchFn,
        onSelect: () => null,
    },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleMediaSelector: Story = {};
