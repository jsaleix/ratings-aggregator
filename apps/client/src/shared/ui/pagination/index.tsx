import { useCallback } from "react";
import type { PaginationType } from "../../types/pagination";

interface Props {
    data: PaginationType;
    onPageChange?: (page: number) => void;
}

export default function Pagination({ data, onPageChange }: Props) {
    const lastPageIdx = Math.floor(data.total / data.perPage);

    const handleOnPageChange = useCallback(
        (page: number) => {
            if (onPageChange) onPageChange(page);
        },
        [onPageChange],
    );

    return (
        <div data-testid="pagination">
            <button
                data-testid="first"
                disabled={data.currentPage === 1}
                onClick={() => handleOnPageChange(1)}
            ></button>
            <button
                data-testid="previous"
                data-pageid={data.prev}
                disabled={data.currentPage <= 1}
                onClick={() => data.prev && handleOnPageChange(data.prev)}
            ></button>
            <button
                data-testid="next"
                data-pageid={data.next}
                disabled={!data.next}
                onClick={() => data.next && handleOnPageChange(data.next)}
            ></button>
            <button
                data-testid="last"
                data-pageid={lastPageIdx}
                disabled={!data.next}
                onClick={() => handleOnPageChange(lastPageIdx)}
            ></button>
        </div>
    );
}
