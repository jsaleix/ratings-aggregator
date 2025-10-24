import { motion, stagger } from "motion/react";

import type { MovieRatingModel } from "../types/movie-rating";
import MovieRatingItem from "./movie-rating-item";

interface Props {
    ratings: MovieRatingModel[];
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

export default function RatingListPart({ ratings }: Props) {
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
                            <motion.li variants={itemVariants} key={rating.id}>
                                <MovieRatingItem rating={rating} />
                            </motion.li>
                        ))}
                </motion.ul>
            )}
        </div>
    );
}
