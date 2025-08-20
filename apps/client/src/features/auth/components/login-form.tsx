import { useForm, useStore } from "@tanstack/react-form";
import clsx from "clsx";

import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { loginSchema } from "../types/auth";
import { useAuthContext } from "../../../core/auth/provider";
import { displayMsg } from "../../../shared/utils/toast";

interface Props {
    containerCss?: string;
}

const errorClass = "font-bold text-red-400 text-sm";

export default function LoginForm({ containerCss }: Props) {
    const { login } = useAuthContext();
    const containerStyle = clsx("flex flex-col gap-5 rounded-md", containerCss);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        onSubmit: async ({ value }) => {
            try {
                return await login(value.email, value.password);
            } catch (e) {
                if (e instanceof Error) displayMsg(e.message, "error");
                else displayMsg("An error occurred", "error");
            }
        },
        validators: {
            onChange: loginSchema,
        },
    });

    const formState = useStore(form.store, (state) => ({
        isValid: state.isValid,
        isTouched: state.isTouched,
    }));

    return (
        <div className={containerStyle}>
            <h2 className="text-2xl">Already a member</h2>
            <form
                className="flex flex-col w-full gap-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field name="email">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                variant={"default"}
                                name="email"
                                placeholder="Email"
                                type="email"
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className={errorClass}>
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </>
                    )}
                </form.Field>
                <form.Field name="password">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                variant={"default"}
                                name="password"
                                placeholder="Password"
                                type="password"
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className={errorClass}>
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </>
                    )}
                </form.Field>
                <Button
                    disabled={!(formState.isValid && formState.isTouched)}
                    variant={"primary"}
                    type="submit"
                >
                    Login
                </Button>
            </form>
        </div>
    );
}
