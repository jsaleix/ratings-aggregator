import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";

const inputVariants = cva(
    "border-1 border-transparent duration-150 px-2 outline-none rounded-sm",
    {
        variants: {
            variant: {
                default:
                    "bg-bg-light text-black placeholder:text-gray-500",
                dark: "bg-black text-white !border-bg-light",
                secondary: "bg-bg-medium !rounded-xl px-3",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
);

type Props = VariantProps<typeof inputVariants> & React.ComponentProps<"input">;

export default function Input({ variant, size, className, ...rest }: Props) {
    const style = clsx(inputVariants({ variant }), className);

    return <input className={style} {...rest} />;
}
