import { motion } from "motion/react";

import type { RatingsSummaryModel } from "../types/ratings-summary";
import Button from "../../../shared/ui/button";
import MovieSummaryItem from "./movie-summary-item";

interface Props {
    summary: RatingsSummaryModel | undefined;
    adminOptions: boolean;
    deleteAction: (id: string) => void;
}

export default function MovieSummaryPart({
    summary,
    adminOptions,
    deleteAction,
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
        >
            <MovieSummaryItem data={summary} />
            {adminOptions && (
                <Button
                    variant={"danger"}
                    onClick={() => deleteAction(summary.id)}
                >
                    Delete
                </Button>
            )}
        </motion.div>
    );
}
