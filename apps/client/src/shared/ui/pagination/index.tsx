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
    const lastPageIdx = Math.floor(data.total / data.perPage);
    const style =
        "bg-white hover:bg-white/80 duration-150 rounded-xs disabled:bg-gray-600 px-2 py-1 text-black cursor-pointer disabled:cursor-not-allowed";

    const handleOnPageChange = useCallback(
        (page: number) => {
            if (onPageChange) onPageChange(page);
        },
        [onPageChange],
    );

    return (
        <div data-testid="pagination" className="flex flex-row gap-3">
            <button
                className={style}
                data-testid="first"
                disabled={data.currentPage === 1}
                onClick={() => handleOnPageChange(1)}
            >
                {"<<"}
            </button>
            <button
                className={style}
                data-testid="previous"
                data-pageid={data.prev}
                disabled={data.currentPage <= 1}
                onClick={() => data.prev && handleOnPageChange(data.prev)}
            >
                {"<"}
            </button>
            <button
                className={style}
                data-testid="next"
                data-pageid={data.next}
                disabled={!data.next}
                onClick={() => data.next && handleOnPageChange(data.next)}
            >
                {">"}
            </button>
            <button
                className={style}
                data-testid="last"
                data-pageid={lastPageIdx}
                disabled={!data.next}
                onClick={() => handleOnPageChange(lastPageIdx)}
            >
                {">>"}
            </button>
        </div>
    );
}
