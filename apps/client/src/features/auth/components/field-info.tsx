import { type AnyFieldApi } from "@tanstack/react-form";

const errorClass = "font-bold text-red-400 text-sm";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
    return (
        field.state.meta.isTouched &&
        field.state.meta.errors.length > 0 && (
            <p className={errorClass}>{field.state.meta.errors[0]?.message}</p>
        )
    );
}
