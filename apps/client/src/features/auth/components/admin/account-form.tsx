import { useForm } from "@tanstack/react-form";

import Field from "../profile/field";
import Input from "../../../../shared/ui/input";
import { ROLES, type RoleType } from "../../../../core/auth/constants";
import Button from "../../../../shared/ui/button";
import Select from "../../../../shared/ui/select";

import {
    adminUpdateUserSchema,
    type AdminUpdateProfileType,
} from "../../types/admin";
import type { UserAdminModel } from "../../../admin/models/user.admin";

interface Props {
    user: UserAdminModel;
    updateAction: (value: AdminUpdateProfileType) => Promise<any>;
}

// const errorClass = "font-bold text-red-400 text-sm";

export default function AdminAccountForm({ user, updateAction }: Props) {
    const form = useForm({
        defaultValues: {
            email: user.email,
            username: user.username,
            role: user.role,
        },
        onSubmit: async ({ value }) => {
            await updateAction(value);
        },
        validators: {
            onChange: adminUpdateUserSchema,
        },
    });

    return (
        <Field name="Account" subTitle="">
            <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field name="email">
                    {(field) => (
                        <Input
                            type="email"
                            placeholder="Email"
                            variant={"default"}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                </form.Field>
                <form.Field name="username">
                    {(field) => (
                        <Input
                            type="text"
                            placeholder="Username"
                            variant={"default"}
                            value={field.state.value}
                            onChange={(e) => field.handleChange(e.target.value)}
                        />
                    )}
                </form.Field>
                <form.Field name="role">
                    {(field) => (
                        <Select
                            value={field.state.value}
                            onChange={(e) =>
                                field.handleChange(e.target.value as RoleType)
                            }
                        >
                            {Object.entries(ROLES).map(([key, value]) => (
                                <option key={key} value={value}>
                                    {key}
                                </option>
                            ))}
                        </Select>
                    )}
                </form.Field>

                <Button variant={"primary"} type="submit">
                    Apply
                </Button>
            </form>
        </Field>
    );
}
