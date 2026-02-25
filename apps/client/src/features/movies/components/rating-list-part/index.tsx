import { motion, stagger } from "motion/react";

import type { MovieRatingModel } from "../../models/movie-rating";
import MovieRatingItem from "../movie-rating-item";
import Button from "../../../../shared/ui/button";

interface Props {
    ratings: MovieRatingModel[];
    adminOptions: boolean;
    deleteAction: (id: string) => void;
}

const itemVariants = {
    hidden: {
        opacity: 0,
        y: -20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.3,
        },
    },
};

const wrapperVariants = {
    hidden: {
        opacity: 0,
        transition: {
            when: "afterChildren",
        },
    },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            delayChildren: stagger(0.1),
            // staggerChildren: .2
        },
    },
};

export default function RatingListPart({
    ratings,
    adminOptions,
    deleteAction,
}: Props) {
    return (
        <div className="flex flex-col">
            {ratings.length === 0 && <p>No rating</p>}
            {ratings.length > 0 && (
                <motion.ul
                    className="flex flex-col md:w-[100%]"
                    animate="visible"
                    initial="hidden"
                    variants={wrapperVariants}
                >
                    {ratings
                        ?.filter((rating) => rating.value !== "N/A")
                        .map((rating) => (
                            <motion.li
                                variants={itemVariants}
                                key={rating.id}
                                className="flex items-center gap-3"
                            >
                                <MovieRatingItem rating={rating} />
                                {adminOptions && (
                                    <Button
                                        className="select-none"
                                        variant={"danger"}
                                        onClick={() => deleteAction(rating.id)}
                                    >
                                        X
                                    </Button>
                                )}
                            </motion.li>
                        ))}
                </motion.ul>
            )}
        </div>
    );
}
