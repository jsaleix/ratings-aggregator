interface Props {
    title: string;
    children?: React.ReactNode;
}

export default function PageHeader({ title, children }: Props) {
    return (
        <header className="w-full flex flex-col items-start gap-3">
            <h1 className="text-2xl font-bol">{title}</h1>
            <div className="md:w-2/3 flex flex-col gap-3">{children}</div>
        </header>
    );
}
