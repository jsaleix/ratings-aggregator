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
                            "cursor-pointer absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700"
                        }
                    >
                        ✕
                    </button>
                </form>
                <div className="flex flex-col gap-5 w-full">
                    <h2 className="text-white text-2xl">How to find the TMDB ID</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Quibusdam consequuntur facere pariatur culpa quia
                        animi sed molestiae molestias! Ea at assumenda neque
                        voluptate earum necessitatibus quisquam eius quaerat
                        soluta debitis.
                    </p>
                </div>
            </div>
        </dialog>
    );
}
