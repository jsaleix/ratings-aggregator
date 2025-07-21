import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
    "border-1 border-transparent px-3 py-1 rounded-md cursor-pointer hover:opacity-85 duration-150",
    {
        variants: {
            variant: {
                default: "bg-bg-light text-black",
                primary: "bg-utils-orange font-bold",
            },
            size: {
                medium: "text-md",
                large: "text-lg",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "medium",
        },
    }
);

export default function Button({
    children,
    variant,
    size,
    className,
    ...rest
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
    const style = clsx(buttonVariants({ variant, size }), className);

    return (
        <button className={style} {...rest}>
            {children}
        </button>
    );
}
