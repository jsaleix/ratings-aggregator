import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import MovieRatingItem from "../../../movies/components/movie-rating-item";
import type { MovieRatingModel } from "../../../movies/types/movie-rating";

const MOCK_RATINGS = [
    {
        id: "16889e8b-3c6e-4ff4-88ef-f247eca8ede7",
        movieId: "79c9f9f3-e2a3-415c-87dc-3856f05ac375",
        value: "3,8",
        extra: "",
        source_url: null,
        created_at: "2025-11-07T16:26:50.230Z",
        updated_at: "2025-11-07T16:26:50.230Z",
        Rating_Source: {
            id: "allocine_audience_id",
            code: "allocine_audience",
            name: "AlloCiné Audience",
            rating_unit: "stars",
            url: "https://www.allocine.fr",
            country_code: "FR",
        },
    },
    {
        id: "c98d3776-9a02-44e9-a07a-5fbbd8c57e62",
        movieId: "79c9f9f3-e2a3-415c-87dc-3856f05ac375",
        value: "5,0",
        extra: "",
        source_url: null,
        created_at: "2025-11-07T16:26:50.216Z",
        updated_at: "2025-11-07T16:26:50.216Z",
        Rating_Source: {
            id: "allocine_press_id",
            code: "allocine_press",
            name: "AlloCiné Press",
            rating_unit: "stars",
            url: "https://www.allocine.fr",
            country_code: "FR",
        },
    },
    {
        id: "6af5c340-c26f-43eb-bd46-f38824e97ef9",
        movieId: "79c9f9f3-e2a3-415c-87dc-3856f05ac375",
        value: "7.7",
        extra: "",
        source_url: "",
        created_at: "2025-11-07T16:26:53.000Z",
        updated_at: "2025-11-07T16:26:53.000Z",
        Rating_Source: {
            id: "imdb_id",
            code: "imdb",
            name: "IMDb",
            rating_unit: "points",
            url: "https://www.imdb.com",
            country_code: "US",
        },
    },
    {
        id: "0245ba64-2db4-4960-9c0c-95a932631ffe",
        movieId: "79c9f9f3-e2a3-415c-87dc-3856f05ac375",
        value: "3.9",
        extra: "",
        source_url: "",
        created_at: "2025-11-07T16:26:54.189Z",
        updated_at: "2025-11-07T16:26:54.189Z",
        Rating_Source: {
            id: "letterboxd_id",
            code: "letterboxd",
            name: "Letterboxd",
            rating_unit: "stars",
            url: "https://letterboxd.com",
            country_code: "US",
        },
    },
    {
        id: "b0d3f72a-0dc9-4708-b5fd-1878260b86e1",
        movieId: "79c9f9f3-e2a3-415c-87dc-3856f05ac375",
        value: "85%",
        extra: "",
        source_url: "",
        created_at: "2025-11-07T16:26:55.616Z",
        updated_at: "2025-11-07T16:26:55.616Z",
        Rating_Source: {
            id: "rotten_tomatoes_id",
            code: "rotten_tomatoes",
            name: "Rotten Tomatoes",
            rating_unit: "percentage",
            url: "https://www.rottentomatoes.com",
            country_code: "US",
        },
    },
    {
        id: "04622809-adcf-42f8-81a5-ad67fc6ecee2",
        movieId: "79c9f9f3-e2a3-415c-87dc-3856f05ac375",
        value: "95%",
        extra: "",
        source_url: "",
        created_at: "2025-11-07T16:26:55.622Z",
        updated_at: "2025-11-07T16:26:55.622Z",
        Rating_Source: {
            id: "rotten_tomatoes_audience_id",
            code: "rotten_tomatoes_audience",
            name: "Rotten Tomatoes Audience",
            rating_unit: "percentage",
            url: "https://www.rottentomatoes.com",
            country_code: "US",
        },
    },
] satisfies MovieRatingModel[];

interface Props {
    className?: string;
}
export default function HeroRatings({ className }: Props) {
    const style = twMerge(
        "relative bg-black/50 backdrop-blur-sm rounded-xl w-fit h-fit py-5 px-8",
        className,
    );
    const ref = useRef<HTMLDivElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 50, damping: 18 });
    const springY = useSpring(y, { stiffness: 50, damping: 18 });

    const rotateX = useTransform(springY, [0, 400], [20, -20]);
    const rotateY = useTransform(springX, [0, 400], [-20, 20]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - rect.left);
        y.set(e.clientY - rect.top);
    };

    const handleMouseLeave = () => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set(rect.width / 2);
        y.set(rect.height / 2);
    };

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            x.set(rect.width / 2);
            y.set(rect.height / 2);
        }
    }, []);

    return (
        <motion.div
            ref={ref}
            className={style}
            onMouseMove={handleMouseMove}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4 } }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: 600,
            }}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div className="inset-5 w-96 h-fit">
                {MOCK_RATINGS.map((rating) => (
                    <MovieRatingItem rating={rating} key={rating.id} />
                ))}
            </motion.div>
        </motion.div>
    );
}
