import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";

import Component from "./index";
import actualUserService from "../../services/user.service";

const userService = actualUserService;
userService.signup = fn();
userService.login = fn();

const meta: Meta<typeof Component> = {
    title: "Auth/AuthForms",
    component: Component,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AuthForms: Story = {};
