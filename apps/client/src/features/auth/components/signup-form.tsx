import clsx from "clsx";
import { useForm, useStore, type AnyFieldApi } from "@tanstack/react-form";

import Button from "../../../shared/ui/button";
import Input from "../../../shared/ui/input";
import { signupSchema } from "../type/auth";
import { displayMsg } from "../../../shared/utils/toast";
import userService from "../services/user.service";

interface Props {
    containerCss?: string;
}

const errorClass = "font-bold text-red-400 text-sm";

function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        field.state.meta.errors.length > 0 && (
            <p className={errorClass}>{field.state.meta.errors[0]?.message}</p>
        )
    );
}

export default function SignupForm({ containerCss }: Props) {
    const containerStyle = clsx("flex flex-col gap-5 rounded-md", containerCss);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
            gcu: false,
        },
        onSubmit: async ({ value }) => {
            const res = await userService.signup(value.email, value.password);
            if (res) {
                form.reset();
                displayMsg("Account created! You can login now", "success");
            } else {
                displayMsg("Could not create your account", "error");
            }
        },
        validators: {
            onChange: signupSchema,
        },
    });

    const formState = useStore(form.store, (state) => ({
        isValid: state.isValid,
        isTouched: state.isTouched,
    }));

    return (
        <div className={containerStyle}>
            <h2 className="text-2xl">Create your account</h2>
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
                            <FieldInfo field={field} />
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
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
                <form.Field name="password_confirmation">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                variant={"default"}
                                name="password_confirmation"
                                placeholder="Password confirmation"
                                type="password"
                            />
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>
                <form.Field name="gcu">
                    {(field) => (
                        <>
                            <div className="flex items-center gap-5">
                                <input
                                    type="checkbox"
                                    id="gcu_consent"
                                    // checked={field.state.value}
                                    // onChange={() =>
                                    //     field.handleChange(!field.state.value)
                                    // }
                                    checked={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(e.target.checked)
                                    }
                                />
                                <label htmlFor="gcu_consent">
                                    I accept the GCU
                                </label>
                            </div>
                            <FieldInfo field={field} />
                        </>
                    )}
                </form.Field>

                <Button
                    disabled={!(formState.isValid && formState.isTouched)}
                    variant={"primary"}
                    type="submit"
                >
                    Join
                </Button>
            </form>
        </div>
    );
}
