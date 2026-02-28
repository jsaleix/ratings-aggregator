import { useMutation, useQuery } from "@tanstack/react-query";
import clsx from "clsx";

import PageHeader from "../../../../shared/ui/page-header";
import Button from "../../../../shared/ui/button";
import { displayMsg } from "../../../../shared/utils/toast";
import ApiAdminRequestsService from "../../services/requests.admin.service";
import Pagination from "../../../../shared/ui/pagination";

export default function RequestsPage() {
    const { data, isFetched, refetch } = useQuery({
        queryKey: ["getRequests"],
        queryFn: async () => {
            return await ApiAdminRequestsService.getAll();
        },
        initialData: [],
        refetchOnWindowFocus: false,
        refetchInterval: 15000,
    });

    const { mutate: deleteRequestMutation } = useMutation({
        mutationFn: async (requestId: string) => {
            if (!window.confirm("Are you sure?"))
                throw new Error("Action canceled");
            return await ApiAdminRequestsService.delete(requestId);
        },
        onSuccess: () => {
            displayMsg("Request deleted!", "success");
            refetch();
        },
        onError: (e) => {
            displayMsg(e.message, "error");
        },
    });

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title="Requests"></PageHeader>
                {isFetched && data.length === 0 && (
                    <p className="text-md italic text-text-secondary">
                        There is no request
                    </p>
                )}
                {!isFetched && <p>Loading...</p>}
                {data.length > 0 && (
                    <div className="flex flex-col w-full">
                        <table className="table-fixed">
                            <thead className="w-full bg-bg-medium text-left">
                                <tr>
                                    <th className="">TMDB ID</th>
                                    <th className="">Created by</th>
                                    <th className="">Date</th>
                                    <th className=""></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((request, idx) => (
                                    <tr
                                        key={request.id}
                                        className={clsx(
                                            idx % 2 === 0
                                                ? "bg-bg-medium/50"
                                                : "bg-bg-medium",
                                        )}
                                    >
                                        <td className="">
                                            <p className="text-white text-bold">
                                                #{request.tmdb_id}
                                            </p>
                                            <a
                                                href={new URL(
                                                    request.tmdb_id.toString(),
                                                    "https://www.themoviedb.org/movie/",
                                                ).toString()}
                                                target="_blank"
                                                className="text-utils-orange hover:underline"
                                            >
                                                See the TMDB page
                                            </a>
                                        </td>
                                        <td className="">
                                            <p>
                                                {request.creator?.username ??
                                                    "Unknown"}
                                            </p>
                                        </td>
                                        <td className="">
                                            {new Date(
                                                request.created_at,
                                            ).toLocaleString()}
                                        </td>
                                        <td className="">
                                            <Button
                                                variant={"danger"}
                                                onClick={() =>
                                                    deleteRequestMutation(
                                                        request.id,
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination data={undefined} />
            </div>
        </div>
    );
}
