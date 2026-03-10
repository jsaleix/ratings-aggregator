import { motion, stagger, AnimatePresence } from "motion/react";
import type { MovieRatingModel } from "../../models/movie-rating";
import MovieRatingItem from "../movie-rating-item";

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
        <motion.div className="flex flex-col">
            {ratings.length === 0 && <p>No rating</p>}
            <AnimatePresence>
                {ratings.length > 0 && (
                    <motion.ul
                        className="flex flex-col md:w-[100%]"
                        animate="visible"
                        initial="hidden"
                        exit={"hidden"}
                        variants={wrapperVariants}
                    >
                        {ratings
                            .filter((rating) => rating.value !== "N/A")
                            .map((rating) => (
                                <motion.li
                                    variants={itemVariants}
                                    key={rating.id}
                                    className="flex items-center gap-3"
                                >
                                    <MovieRatingItem rating={rating} />
                                </motion.li>
                            ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
