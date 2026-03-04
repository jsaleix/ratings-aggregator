import clsx from "clsx";

interface Column {
    header: React.ReactNode;
    key: string;
}

interface TableProps<T> {
    columns: Column[];
    data: T[];
    renderRow: (item: T, idx: number) => React.ReactNode;
}

export default function Table<T>({ columns, data, renderRow }: TableProps<T>) {
    return (
        <div className="flex flex-col w-full">
            <table>
                <thead className="w-full bg-bg-medium text-left uppercase">
                    <tr>
                        {columns.map((col) => (
                            <th
                                key={col.key}
                                className="pl-3 font-semibold py-3"
                            >
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, idx) => renderRow(item, idx))
                    ) : (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-10 text-center text-gray-400"
                            >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

function Row({
    children,
    idx,
    className,
}: {
    children: React.ReactNode;
    idx: number;
    className?: string;
}) {
    const style = clsx(
        "",
        idx % 2 === 0 ? "bg-bg-medium/50" : "bg-bg-medium",
        className,
    );
    return <tr className={style}>{children}</tr>;
}

function Cell({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const style = clsx("pl-3", className);
    return <td className={style}>{children}</td>;
}

Table.Row = Row;
Table.Cell = Cell;
