import clsx from "clsx";

interface Props {
    children?: React.ReactNode;
    className?: string;
    colorClass?: string;
}

export default function UnderlinedItem({
    children,
    className,
    colorClass,
}: Props) {
    const color = colorClass ? colorClass : "bg-white";

    const base = "relative inline-block text-black group cursor-pointer";
    const style = clsx(base, className);

    return (
        <div className={style}>
            <span className="relative z-10 px-1">{children}</span>
            <span
                className={`absolute left-0 bottom-0 h-0.5 w-full ${color} transition-all duration-300 group-hover:h-full group-hover:bottom-0 z-0`}
            ></span>
        </div>
    );
}
