import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

import apiRequestService from "../services/api-request.service";
import RequestListItem from "../components/requests-list-item";
import Button from "../../../shared/ui/button";
import PageHeader from "../../../shared/ui/page-header";

export default function RequestsPage() {
    const { data } = useQuery({
        queryKey: ["getRequests"],
        queryFn: async () => {
            // return [];
            return apiRequestService.getAll();
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 items-center px-5 md:px-0">
                <PageHeader title="Movie requests">
                    <p className="text-text-secondary">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis ipsam accusamus expedita voluptates eos
                        perspiciatis, alias ullam esse aliquid minus maiores
                        rem, saepe odio? Nulla doloribus accusamus culpa ut
                        dolorem?
                        <br />
                        Limits: max. 10 requests per day
                    </p>
                    <Link to="/requests/create" className="mr-auto">
                        <Button variant={"primary"}>Make a request</Button>
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
