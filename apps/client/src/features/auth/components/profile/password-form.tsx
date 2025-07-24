import { useForm, useStore } from "@tanstack/react-form";
import Button from "../../../../shared/ui/button";
import Input from "../../../../shared/ui/input";
import { updatePasswordSchema } from "../../types/auth";
import ProfilePart from "./field";
import profileService from "../../services/profile.service";
import { displayMsg } from "../../../../shared/utils/toast";

interface Props {}

const errorClass = "font-bold text-red-400 text-sm";

export default function PasswordForm({}: Props) {
    const form = useForm({
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
        onSubmit: async ({ value }) => {
            try {
                await profileService.updatePassword(
                    value.current_password,
                    value.password
                );
                form.reset()
                displayMsg("Password updated!", "success");
            } catch (e: any) {
                if (e instanceof Error) displayMsg(e.message, "error");
                else displayMsg("Could not update your password", "error");
            }
        },
        validators: {
            onChange: updatePasswordSchema,
        },
    });

    const formState = useStore(form.store, (state) => ({
        isValid: state.isValid,
        isTouched: state.isTouched,
    }));

    return (
        <ProfilePart name="Password">
            <form
                className="flex flex-col gap-5"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}
            >
                <form.Field name="current_password">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="Current password"
                                variant={"default"}
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

                <form.Field name="password">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="New Password"
                                variant={"default"}
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

                <form.Field name="password_confirmation">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                placeholder="New Password Confirmation"
                                variant={"default"}
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
                    Update password
                </Button>
            </form>
        </ProfilePart>
    );
}
