import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const buttonVariants = cva(
    "border-1 border-transparent px-3 py-1 rounded-md cursor-pointer hover:opacity-85 duration-150 disabled:cursor-not-allowed",
    {
        variants: {
            variant: {
                default: "bg-bg-light text-black",
                primary: "bg-primary font-bold disabled:opacity-60",
                secondary: "bg-utils-yellow font-bold disabled:opacity-60"
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

type Props = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants>;

export default function Button({
    children,
    variant,
    size,
    className,
    ...rest
}: Props) {
    const style = clsx(buttonVariants({ variant, size }), className);

    return (
        <button className={style} {...rest}>
            {children}
        </button>
    );
}
