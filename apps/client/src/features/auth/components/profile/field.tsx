interface Props {
    name: string;
    subTitle?: string;
    children?: React.ReactNode;
}

export default function Field({ name, subTitle, children }: Props) {
    return (
        <div className="flex w-full flex-col md:flex-row gap-5 md:gap-0">
            <div className="flex flex-col gap-1 w-full md:w-2/4 px-0">
                <h2 className="text-lg text-white">{name}</h2>
                {subTitle && (
                    <p className="text-sm font-light text-text-secondary">
                        {subTitle}
                    </p>
                )}
            </div>
            <div className="w-full md:w-1/2">{children}</div>
        </div>
    );
}
