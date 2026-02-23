import type { RatingsSummaryModel } from "../../../../movies/models/ratings-summary";

interface Props {
    summary: RatingsSummaryModel | null;
}

export default function SummaryElement({ summary }: Props) {
    if (!summary) return <div className="w-full md:w-[50%]"></div>;

    return (
        <div className="flex flex-col md:flex-row w-full md:w-[50%] justify-start md:gap-5">
            {summary && summary?.score !== "N/A" && (
                <h2 className="text-6xl font-bold">{summary.score}</h2>
            )}
            {summary?.score === "N/A" && (
                <h2 className="text-6xl text-text-secondary">N/A</h2>
            )}
        </div>
    );
}
