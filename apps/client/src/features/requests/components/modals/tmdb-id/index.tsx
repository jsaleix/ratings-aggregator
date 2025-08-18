import { useRef, useCallback, useEffect } from "react";

interface Props {
    modalState: boolean;
    onClose?: () => void;
}

export default function GetTMDBIdModal({ modalState, onClose }: Props) {
    const modalRef = useRef<HTMLDialogElement>(null);

    const closeModal = useCallback(() => {
        if (onClose) onClose();
        modalRef.current!.close();
    }, []);

    useEffect(() => {
        if (modalState) {
            modalRef.current!.showModal();
        }
    }, [modalState]);

    return (
        <dialog
            onClose={closeModal}
            ref={modalRef}
            id="tmdb_id_modal"
            className={"modal"}
        >
            <div className={"modalBox"}>
                <form method="dialog" className="outline-none">
                    <button
                        className={
                            "cursor-pointer absolute top-2 right-4 text-xl text-gray-500 hover:text-gray-700"
                        }
                    >
                        ✕
                    </button>
                </form>
                <div className="flex flex-col gap-5 w-full">
                    <h2 className="text-white text-2xl">
                        How to find the TMDB ID
                    </h2>
                    <ol className="flex flex-col gap-2">
                        <li>
                            1. Go to{" "}
                            <a href="https://www.themoviedb.org/" target="_blank" className="link">
                                themoviedb.org
                            </a>
                        </li>
                        <li>2. Search for your movie</li>
                        <li>
                            <p>
                                3. Open its page — the number in the URL is the
                                movie ID.
                            </p>
                        </li>
                        <li className="flex flex-col gap-1">
                            <p className="text-white">Example:</p>
                            <code className="bg-secondary text-black px-2 w-fit select-none">
                                https://www.themoviedb.org/movie/8619
                            </code>
                            <p>
                                the ID is <b>8619</b>
                            </p>
                        </li>
                    </ol>
                </div>
            </div>
        </dialog>
    );
}
