import { useState } from "react";
import { useNavigate } from "react-router";

import { displayMsg } from "../../../shared/utils/toast";
import PageHeader from "../../../shared/ui/page-header";
import Button from "../../../shared/ui/button";

import RequestForm from "../components/new-request-form";
import RequestPremiumForm from "../components/new-request-premium-form";
import useRequest from "../hooks/use-request";

export default function NewRequestPage() {
    const navigate = useNavigate();
    const [searchBy, setSearchBy] = useState<"title" | "tmdbId">("title");

    // const { mutateAsync: createRequest } = useMutation({
    //     mutationFn: async (request: CreateRequestType) => {
    //         return await apiRequestService.create(request);
    //     },
    //     onSuccess: () => {
    //         displayMsg("Request successfuly added!", "success");
    //         navigate("/requests");
    //     },
    //     onError: (e) => {
    //         displayMsg(e.message, "error");
    //     },
    // });

    const { createRequestMutation } = useRequest({
        successCb: () => {
            displayMsg("Request successfuly added!", "success");
            navigate("/requests");
        },
        errorCb: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="New request">
                    <div className="flex items-center gap-5">
                        <Button
                            variant={
                                searchBy === "title" ? "primary" : "default"
                            }
                            onClick={() => setSearchBy("title")}
                        >
                            Search by Title
                        </Button>
                        <Button
                            variant={
                                searchBy === "tmdbId" ? "primary" : "default"
                            }
                            onClick={() => setSearchBy("tmdbId")}
                        >
                            Search by TMDB ID
                        </Button>
                    </div>
                </PageHeader>
                <div className="flex md:w-2/3">
                    {searchBy === "title" && (
                        <RequestPremiumForm
                            label="Create"
                            action={createRequestMutation}
                        />
                    )}
                    {searchBy === "tmdbId" && (
                        <RequestForm
                            label="Create"
                            action={createRequestMutation}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
