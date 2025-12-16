import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../../../shared/ui/page-header";
import apiRequestService from "../../../requests/services/api-request.service";
import { mapApiRequestToMovieRequestModel } from "../../../requests/types/api-request";
import clsx from "clsx";
import Button from "../../../../shared/ui/button";

export default function RequestsPage() {
    const { data, isFetched } = useQuery({
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
                                    <th className="">Title</th>
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
                                                : "bg-bg-medium"
                                        )}
                                    >
                                        <td title={request.id} className="">
                                            <p>{request.title}</p>
                                        </td>
                                        <td className="">
                                            <p className="text-white text-bold">
                                                #{request.tmdbId}
                                            </p>
                                            <a
                                                href={new URL(
                                                    request.tmdbId.toString(),
                                                    "https://www.themoviedb.org/movie/"
                                                ).toString()}
                                                target="_blank"
                                                className="text-utils-orange hover:underline"
                                            >
                                                See the TMDB page
                                            </a>
                                        </td>
                                        <td className="">
                                            <p>Unknown yet</p>
                                        </td>
                                        <td className="">
                                            {new Date(
                                                request.created_at
                                            ).toLocaleString()}
                                        </td>
                                        <td className="">
                                            <Button variant={"danger"}>
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
