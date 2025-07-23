import clsx from "clsx";
import type { ComponentProps } from "react";

type Props = ComponentProps<"select">;

export default function Select({ className, children, ...rest }: Props) {
    const style = clsx(
        "py-1 px-3 bg-bg-medium rounded-md outline-none shadow-md",
        className
    );

    return (
        <select className={style} {...rest}>
            {children}
        </select>
    );
}
