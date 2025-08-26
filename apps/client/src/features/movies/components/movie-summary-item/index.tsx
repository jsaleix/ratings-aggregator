import type { RatingsSummaryModel } from "../../types/ratings-summary";

interface Props {
    data: RatingsSummaryModel;
}

export default function MovieSummaryItem({ data }: Props) {
    return (
        <div className="w-full xl:w-2/4 h-fit bg-bg-medium p-5 rounded-xl shadow-md flex flex-col gap-1">
            <h2 className="uppercase text-primary font-bold">Synthesis</h2>

            <div className="flex items-start gap-5">
                <span className="font-bold text-8xl">{data.score}</span>
                <div>
                    <p className="text-white">{data.content}</p>
                    <p className="text-text-secondary font-light text-sm">
                        <span>Last update: </span>
                        {new Date(data.updated_at).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
}
