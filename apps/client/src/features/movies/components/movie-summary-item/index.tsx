import { useState } from "react";

import type { RatingsSummaryModel } from "../../models/ratings-summary";
import AnimatedNumber from "../animated-number";

interface Props {
    data: RatingsSummaryModel;
}

export default function MovieSummaryItem({ data }: Props) {
    const [currentValue, setCurrentValue] = useState(0);
    const numberStyle =
        currentValue < 50
            ? "text-red-300"
            : currentValue < 60
              ? "text-orange-300"
              : currentValue < 75
                ? "text-lime-300"
                : "text-emerald-300";

    return (
        <div className="w-full xl:w-2/4 h-fit bg-bg-medium p-5 rounded-xl shadow-md flex flex-col gap-1">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-5">
                <span className={"font-bold text-8xl select-none"}>
                    <AnimatedNumber
                        className={numberStyle}
                        duration={3.0}
                        value={data.score_value}
                        onUpdate={setCurrentValue}
                    />
                    %
                </span>
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
