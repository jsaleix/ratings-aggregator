import { useQuery } from "@tanstack/react-query";
import apiRequestService from "../services/api-request.service";
import RequestListItem from "../components/requests-list-item";
import Button from "../../../shared/ui/button";
import UnderlinedItem from "../../../shared/ui/underlined-item";

export default function RequestsPage() {
    const { data } = useQuery({
        queryKey: ["getRequests"],
        queryFn: async () => {
            return apiRequestService.getAll();
        },
        initialData: [],
        refetchOnWindowFocus: false,
    });

    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5">
                <header className="relative flex flex-col items-center gap-3 px-5 md:px-0">
                    <h1 className="text-2xl font-bol">Requests</h1>
                    <p className="text-text-secondary md:max-w-2/3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quis ipsam accusamus expedita voluptates eos
                        perspiciatis, alias ullam esse aliquid minus maiores
                        rem, saepe odio? Nulla doloribus accusamus culpa ut
                        dolorem?
                        <br />
                        Limits: max. 10 requests per day
                    </p>
                    <Button variant={"primary"}>Make a request</Button>
                </header>
                <div className="flex w-full flex-col justify-center px-5 md:px-0">
                    {data.length === 0 && <p>There is no request pending</p>}
                    {data.length > 0 && (
                        <div className="w-full flex flex-col">
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
