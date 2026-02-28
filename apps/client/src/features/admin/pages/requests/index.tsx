import clsx from "clsx";

import PageHeader from "../../../../shared/ui/page-header";
import Button from "../../../../shared/ui/button";
import Pagination from "../../../../shared/ui/pagination";
import Select from "../../../../shared/ui/select";
import { useAdminRequests } from "../../hooks/use-admin-requests";

const parseBoolean = (value: string): boolean | undefined =>
    (
        ({
            true: true,
            false: false,
        }) as Record<string, boolean | undefined>
    )[value];

export default function RequestsPage() {
    const {
        setPage,
        isProcessed,
        setIsProcessed,
        isEmpty,
        isLoading,
        requests,
        pagination,
        deleteRequestMutation,
    } = useAdminRequests();

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <div>
                    <PageHeader title="Requests"></PageHeader>
                    <Select
                        value={(isProcessed ?? "undefined").toString()}
                        onChange={(e) =>
                            setIsProcessed(parseBoolean(e.target.value))
                        }
                    >
                        <option value={"undefined"}>Undefined</option>
                        <option value={"true"}>True</option>
                        <option value={"false"}>False</option>
                    </Select>
                </div>
                {isEmpty && (
                    <p className="text-md italic text-text-secondary">
                        There is no request
                    </p>
                )}
                {isLoading && <p>Loading...</p>}
                {requests.length > 0 && (
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
                                {requests.map((request, idx) => (
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
                <Pagination data={pagination} onPageChange={setPage} />
            </div>
        </div>
    );
}
