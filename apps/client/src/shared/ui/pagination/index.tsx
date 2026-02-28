import { useCallback } from "react";
import type { PaginationType } from "../../types/pagination";

interface Props {
    data: PaginationType | undefined;
    onPageChange?: (page: number) => void;
}

const empty_pagination = {
    total: 0,
    currentPage: 1,
    next: null,
    prev: null,
    perPage: 10,
} satisfies PaginationType;

export default function Pagination({
    data = empty_pagination,
    onPageChange,
}: Props) {
    const lastPageIdx = Math.round(data.total / data.perPage);
    const style =
        "bg-white hover:bg-white/80 duration-150 rounded-xs disabled:bg-gray-600 px-2 py-1 text-black cursor-pointer disabled:cursor-not-allowed";

    const handleOnPageChange = useCallback(
        (page: number) => {
            if (onPageChange) onPageChange(page);
        },
        [onPageChange],
    );

    const idxStart =
        data.currentPage == 1
            ? data.total > 0
                ? 1
                : 0
            : (data.currentPage - 1) * data.perPage + 1;
    const idxEnd =
        data.total - idxStart < data.perPage
            ? data.total
            : idxStart + data.perPage - 1;

    return (
        <div
            data-testid="pagination"
            className="flex flex-row gap-3 items-center"
        >
            <button
                className={style}
                data-testid="pagination-first"
                disabled={data.currentPage === 1}
                onClick={() => handleOnPageChange(1)}
            >
                {"<<"}
            </button>
            <button
                className={style}
                data-testid="pagination-previous"
                data-pageid={data.prev}
                disabled={data.currentPage <= 1}
                onClick={() => data.prev && handleOnPageChange(data.prev)}
            >
                {"<"}
            </button>
            <label data-testid="pagination-label">
                <span className="font-bold">{idxStart}</span> to{" "}
                <span className="font-bold">{idxEnd}</span> of{" "}
                <span className="font-bold">{data.total}</span>
            </label>
            <button
                className={style}
                data-testid="pagination-next"
                data-pageid={data.next}
                disabled={!data.next}
                onClick={() => data.next && handleOnPageChange(data.next)}
            >
                {">"}
            </button>
            <button
                className={style}
                data-testid="pagination-last"
                data-pageid={lastPageIdx}
                disabled={!data.next}
                onClick={() => handleOnPageChange(lastPageIdx)}
            >
                {">>"}
            </button>
        </div>
    );
}
