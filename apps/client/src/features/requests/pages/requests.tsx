import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { motion, stagger } from "motion/react";

import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-header";
import Divider from "../../../shared/ui/divider";

import { useAuthContext } from "../../../core/auth/provider";
import LastMoviesUpdated from "../../movies/components/movie-posters-section/last-movies-updated";
import apiRequestService from "../services/api-request.service";
import useMoviesJobPipeline from "../../pipelines/hooks/use-movies-job-pipeline";
import MovieJobListItem from "../../pipelines/components/movie-job-list-item";

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

export default function RequestsPage() {
    const { role } = useAuthContext();
    const { data: count } = useQuery({
        queryKey: ["getMovieRequestsCount"],
        queryFn: async () => {
            return apiRequestService.getCount();
        },
        initialData: {
            current: -1,
            max: -1,
            left: -1,
        },
    });

    // const { data } = useQuery({
    //     queryKey: ["getRequests"],
    //     queryFn: async () => {
    //         const res = await apiRequestService.getAll();
    //         return res.map((item) => mapApiRequestToMovieRequestModel(item));
    //     },
    //     initialData: [],
    //     refetchOnWindowFocus: false,
    //     refetchInterval: 15000,
    // });

    const { jobs } = useMoviesJobPipeline();

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 items-center px-5 md:px-0">
                <PageHeader title="Movie requests">
                    <p className="text-text-secondary">
                        You can request any movie to be added. Once submitted,
                        it will be queued and processed to fetch its data and
                        ratings. You can also use this feature to update an
                        existing movie.
                        <br />
                        Please note that there is a daily limit on requests,
                        shared by all users. This limit helps prevent the
                        platform from sending too many requests to external
                        sites.
                        <br />
                        <span className="text-white">
                            Limits: max. {count.max} request(s) per day - Left:{" "}
                            {count.left}
                        </span>{" "}
                        (shared between users)
                    </p>
                    <Link to="/requests/create" className="mr-auto">
                        <Button
                            variant={"primary"}
                            disabled={count.left < 1 && role !== "admin"}
                        >
                            Make a request
                        </Button>
                    </Link>
                </PageHeader>
                <Divider />
                <div className="flex w-full flex-col justify-center px-5 md:px-0 md:pb-5">
                    <h2 className="text-xl font-semibold">Current jobs</h2>
                    {jobs.length === 0 && (
                        <p className="text-center text-text-secondary font-thin">
                            There is no movie being added
                        </p>
                    )}
                    {jobs.length > 0 && (
                        <motion.ul
                            className="w-full flex flex-col border-0 border-t-bg-light gap-2"
                            variants={wrapperVariants}
                            animate="visible"
                            initial="hidden"
                        >
                            {jobs.map((job) => (
                                <motion.li
                                    className="list-none"
                                    variants={itemVariants}
                                    key={job.tmdb_id}
                                >
                                    <MovieJobListItem job={job} />
                                </motion.li>
                            ))}
                        </motion.ul>
                    )}
                </div>
            </div>
            <LastMoviesUpdated />
        </div>
    );
}
