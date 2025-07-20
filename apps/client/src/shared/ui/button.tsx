import clsx from "clsx";
import type { ButtonHTMLAttributes, HTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLElement> {}

export default function Button({ children, className, ...rest }: Props) {
    const baseStyle =
        "bg-bg-light px-3 py-1 rounded-md text-black cursor-pointer";
    const style = clsx(className, baseStyle);

    return (
        <button className={style} {...rest}>
            {children}
        </button>
    );
}
