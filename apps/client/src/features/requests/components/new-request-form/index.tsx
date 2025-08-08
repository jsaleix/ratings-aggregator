import { useState } from "react";
import Button from "../../../../shared/ui/button";
import Input from "../../../../shared/ui/input";
import GetTMDBIdModal from "../modals/tmdb-id";
import { useForm, useStore } from "@tanstack/react-form";
import {
    createRequestSchema,
    type CreateRequestType,
} from "../../types/schemas";

interface Props {
    label: string;
    action?: (data: CreateRequestType) => any;
}

const errorClass = "font-bold text-red-400 text-sm";

export default function RequestForm({ label, action }: Props) {
    const [modalState, setModalState] = useState(false);
    const form = useForm({
        defaultValues: {
            tmdbId: -1,
            title: "",
        },
        onSubmit: async ({ value }) => {
            if (action) action(value);
        },
        validators: {
            onChange: createRequestSchema,
        },
    });
    const formState = useStore(form.store, (state) => ({
        isValid: state.isValid,
        isTouched: state.isTouched,
    }));

    return (
        <>
            <form
                className="flex flex-col gap-3 w-full"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                <div className="flex flex-col gap-1">
                    <form.Field name="tmdbId">
                        {(field) => (
                            <>
                                <Input
                                    value={field.state.value}
                                    onChange={(e) =>
                                        field.handleChange(+e.target.value)
                                    }
                                    type="number"
                                    variant={"default"}
                                    placeholder="TMDB ID"
                                />
                                {field.state.meta.errors.length > 0 && (
                                    <p className={errorClass}>
                                        {field.state.meta.errors[0]?.message}
                                    </p>
                                )}
                            </>
                        )}
                    </form.Field>

                    <a
                        onClick={() => setModalState(true)}
                        className="cursor-pointer w-fit font-light text-text-secondary underline text-sm hover:opacity-85"
                    >
                        Where to get it?
                    </a>
                </div>

                <form.Field name="title">
                    {(field) => (
                        <>
                            <Input
                                value={field.state.value}
                                onChange={(e) =>
                                    field.handleChange(e.target.value)
                                }
                                variant={"default"}
                                placeholder="Title of the movie"
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
                    onClick={() => form.handleSubmit()}
                >
                    {label}
                </Button>
            </form>
            <GetTMDBIdModal
                modalState={modalState}
                onClose={() => setModalState(false)}
            />
        </>
    );
}
