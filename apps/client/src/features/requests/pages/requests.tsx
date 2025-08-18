import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import apiRequestService from "../services/api-request.service";
import RequestListItem from "../components/requests-list-item";
import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-header";
import { mapApiRequestToMovieRequestModel } from "../types/api-request";
import { useAuthContext } from "../../../core/auth/provider";

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

    const { data } = useQuery({
        queryKey: ["getRequests"],
        queryFn: async () => {
            const res = await apiRequestService.getAll();
            return res.map((item) => mapApiRequestToMovieRequestModel(item));
        },
        initialData: [],
        refetchOnWindowFocus: false,
        refetchInterval: 15000,
    });

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 items-center px-5 md:px-0">
                <PageHeader title="Movie requests">
                    <p className="text-text-secondary">
                        You can add any movie of your choice by submitting a
                        request. Once submitted, the request will be added to
                        the queue and processed by retrieving the movie’s data
                        and ratings.
                        <br />
                        You can also use this feature to update an existing
                        movie — in that case, the data retrieval step will be
                        skipped, and only the ratings will be refreshed.
                        <br />
                        Please note that this feature is subject to a daily
                        request limit, which may change at any time. This limit
                        is shared between all users and is in place to prevent
                        the platform from sending too many requests to external
                        websites, which could result in being blocked by them.
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
                <div className="flex w-full flex-col justify-center px-5 md:px-0 ">
                    {data.length === 0 && (
                        <p className="text-center text-text-secondary font-thin">
                            There is no request pending
                        </p>
                    )}
                    {data.length > 0 && (
                        <div className="w-full flex flex-col border-0 border-t-bg-light">
                            {data.map((request) => (
                                <RequestListItem
                                    request={request}
                                    key={request.id}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
