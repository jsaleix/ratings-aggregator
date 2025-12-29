import { useForm, useStore } from "@tanstack/react-form";

import { useAuthContext } from "../../../../core/auth/provider";
import Button from "../../../../shared/ui/button";
import Input from "../../../../shared/ui/input";
import { updateProfileSchema, type UpdateProfileType } from "../../types/auth";
import ProfilePart from "./field";

interface Props {
    updateAction: (value: UpdateProfileType) => Promise<boolean>;
}

const errorClass = "font-bold text-red-400 text-sm";

export default function ProfileForm({ updateAction }: Props) {
    const { user } = useAuthContext();
    const form = useForm({
        defaultValues: {
            email: user?.email ?? "",
            username: user?.username ?? "",
        },
        onSubmit: async ({ value }) => {
            await updateAction(value);
        },
        validators: {
            onChange: updateProfileSchema,
        },
    });

    const formState = useStore(form.store, (state) => ({
        isValid: state.isValid,
        isTouched: state.isTouched,
    }));

    return (
        <ProfilePart
            name="Account"
            subTitle="Your email address is your identity on Aggregator and is used to log in."
        >
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
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="Email"
                                variant={"default"}
                            />
                            {field.state.meta.errors.length > 0 && (
                                <p className={errorClass}>
                                    {field.state.meta.errors[0]?.message}
                                </p>
                            )}
                        </>
                    )}
                </form.Field>
                <form.Field name="username">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="Username"
                                variant={"default"}
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
                    Update
                </Button>
            </form>
        </ProfilePart>
    );
}
