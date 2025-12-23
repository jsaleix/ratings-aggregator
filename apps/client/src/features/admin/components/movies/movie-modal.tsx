import { useCallback, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion } from "motion/react";

import type { MovieModel } from "../../../movies/types/movie";
import Button from "../../../../shared/ui/button";
import { displayMsg } from "../../../../shared/utils/toast";
import apiRequestService from "../../../requests/services/api-request.service";
import useMovie from "../../../movies/hooks/use-movie";

interface Props {
    movie: MovieModel | null;
    onClose: () => void;
}

const divVariants = {
    hidden: {
        opacity: 0,
        transform: "translateY(40px)",
    },
    visible: {
        opacity: 1,
        transform: "translateY(0px)",
        transition: {
            duration: 0.4,
            delay: 0.2,
        },
    },
};

export default function MovieModal({ onClose, movie }: Props) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const closeModal = useCallback(() => {
        if (onClose) onClose();
        modalRef.current!.close();
    }, []);

    const { deleteMovieMutation } = useMovie(movie?.id, closeModal);

    const { mutate: sendToReloadQueue } = useMutation({
        mutationFn: async () => {
            if (!movie) throw new Error("No movie provided");
            return apiRequestService.create({
                tmdbId: movie.tmdbId,
            });
        },
        onSuccess: () => {
            displayMsg("Movie successfully added to queue!", "success");
            closeModal();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    useEffect(() => {
        if (movie) modalRef.current?.showModal();
    }, [movie]);

    return (
        <dialog
            onClose={closeModal}
            ref={modalRef}
            id="movie-modal"
            className={"modal"}
        >
            <motion.div
                className={"modalBox"}
                variants={divVariants}
                initial={false}
                animate={movie ? "visible" : "hidden"}
            >
                <form method="dialog" className="outline-none">
                    <button
                        className={
                            "cursor-pointer absolute top-2 right-4 text-xl text-gray-500 hover:text-gray-700"
                        }
                    >
                        ✕
                    </button>
                </form>
                <div className="flex flex-col gap-5">
                    <h2 className="text-white text-2xl">{movie?.title}</h2>
                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => sendToReloadQueue()}
                            variant={"primary"}
                        >
                            Send to reload queue
                        </Button>
                        <Button
                            onClick={() => deleteMovieMutation()}
                            variant={"danger"}
                        >
                            Delete movie
                        </Button>
                    </div>
                </div>
            </motion.div>
        </dialog>
    );
}
