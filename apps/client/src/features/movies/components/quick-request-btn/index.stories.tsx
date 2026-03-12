import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import Component from ".";
import { MovieMockData } from "../../../../assets/data-test/movies";
import { MOVIE_STATUS } from "../../../pipelines/constants";
import actualService from "../../../requests/services/api-request.service";

const apiRequestService = actualService;
apiRequestService.create = fn();

const meta: Meta<typeof Component> = {
    title: "Movies/QuickRequestBtn",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Disabled: Story = {
    args: {
        jobStatus: MOVIE_STATUS.FETCHING,
        movie: MovieMockData,
    },
};

export const Works: Story = {
    args: {
        jobStatus: null,
        movie: MovieMockData,
    },
};
