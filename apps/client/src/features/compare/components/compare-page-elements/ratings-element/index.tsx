import { motion, stagger } from "motion/react";
import MovieRatingItem from "../../../../movies/components/movie-rating-item";
import type { MovieRatingModel } from "../../../../movies/types/movie-rating";

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

interface Props {
    ratings: MovieRatingModel[] | null;
}

export default function RatingsElement({ ratings }: Props) {
    if (!ratings) return <div className="w-full md:w-[50%]"></div>;
    return (
        <motion.ul
            className="flex flex-col w-full md:w-[50%]"
            animate="visible"
            initial="hidden"
            variants={wrapperVariants}
        >
            {ratings.map((rating) => (
                <motion.li variants={itemVariants} key={rating.id}>
                    <MovieRatingItem rating={rating} key={rating.id} />
                </motion.li>
            ))}
        </motion.ul>
    );
}
