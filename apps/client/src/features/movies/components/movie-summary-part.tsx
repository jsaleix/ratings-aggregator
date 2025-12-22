import { motion } from "motion/react";

import type { RatingsSummaryModel } from "../types/ratings-summary";
import Button from "../../../shared/ui/button";
import MovieSummaryItem from "./movie-summary-item";
import ArrowIcon from "../../../shared/ui/icons/arrow-icon";

interface Props {
    summary: RatingsSummaryModel | undefined;
    adminOptions: boolean;
    deleteAction: (id: string) => void;
    refreshAction: (id: string) => void;
}

export default function MovieSummaryPart({
    summary,
    adminOptions,
    deleteAction,
    refreshAction,
}: Props) {
    if (!summary) return;
    return (
        <motion.div
            initial={"hidden"}
            whileInView={"visible"}
            viewport={{ once: true }}
            variants={{
                hidden: {
                    opacity: 0,
                    y: -20,
                },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        delay: 0.2,
                    },
                },
            }}
            className="flex flex-col gap-3"
        >
            <MovieSummaryItem data={summary} />
            {adminOptions && (
                <div className="flex items-center gap-3">
                    <Button
                        className="w-fit flex items-center gap-3"
                        variant={"danger"}
                        onClick={() => deleteAction(summary.id)}
                    >
                        Delete <ArrowIcon className="fill-white" />
                    </Button>
                    <Button
                        className="w-fit flex items-center gap-3"
                        variant={"primary"}
                        onClick={() => refreshAction(summary.id)}
                    >
                        Refresh <ArrowIcon className="fill-white" />
                    </Button>
                </div>
            )}
        </motion.div>
    );
}
