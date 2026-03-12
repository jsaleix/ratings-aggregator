import { useState } from "react";

import Button from "../../../../shared/ui/button";
import Spinner from "../../../../shared/ui/spinner";
import ArrowIcon from "../../../../shared/ui/icons/arrow-icon";
import { displayMsg } from "../../../../shared/utils/toast";

import useRequest from "../../../requests/hooks/use-request";
import type { MovieModel } from "../../models/movie";

interface Props {
    jobStatus?: any;
    movie: MovieModel;
}

export default function QuickRequestBtn({ jobStatus, movie }: Props) {
    const [disableRequestBtn, setDisableRequestBtn] = useState(false);

    const { createRequestMutation } = useRequest({
        successCb: () => {
            displayMsg("Request added to the queue!", "success");
        },
        errorCb: (e) => {
            displayMsg(e.message, "error");
            setDisableRequestBtn(false);
        },
    });

    const handleCreateRequest = () => {
        if (!movie) return;
        setDisableRequestBtn(true);
        createRequestMutation({ tmdbId: movie.tmdbId });
    };

    return (
        <Button
            disabled={jobStatus !== null || disableRequestBtn}
            className="text-black flex items-center gap-3 w-fit"
            variant={"secondary"}
            onClick={handleCreateRequest}
        >
            Quick request
            {jobStatus !== null || disableRequestBtn ? (
                <Spinner />
            ) : (
                <ArrowIcon className="fill-black group-hover:translate-x-1.5 duration-150" />
            )}
        </Button>
    );
}
