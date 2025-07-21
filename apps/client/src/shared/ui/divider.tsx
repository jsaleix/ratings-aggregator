import clsx from "clsx";

interface Props {
    css?: string;
}

export default function Divider({ css }: Props) {
    const style = clsx("w-full border-bg-light", css);
    return <hr className={style} />;
}
