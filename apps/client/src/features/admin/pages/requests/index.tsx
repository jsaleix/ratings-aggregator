import PageHeader from "../../../../shared/ui/page-header";
import Button from "../../../../shared/ui/button";
import Pagination from "../../../../shared/ui/pagination";
import Select from "../../../../shared/ui/select";
import Table from "../../../../shared/ui/table";

import { useAdminRequests } from "../../hooks/use-admin-requests";

const parseBoolean = (value: string): boolean | undefined =>
    (
        ({
            true: true,
            false: false,
        }) as Record<string, boolean | undefined>
    )[value];

const columns = [
    { header: "TMDB ID", key: "tmdb_id" },
    { header: "Created By", key: "created_by" },
    { header: "Date", key: "date" },
    { header: "Actions", key: "actions" },
];

export default function RequestsPage() {
    const {
        setPage,
        isProcessed,
        setIsProcessed,
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
                {isLoading && <p>Loading...</p>}
                <Table
                    columns={columns}
                    data={requests}
                    renderRow={(request, idx) => (
                        <Table.Row idx={idx}>
                            <Table.Cell className="">
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
                            </Table.Cell>
                            <Table.Cell className="">
                                <p>{request.creator?.username ?? "Unknown"}</p>
                            </Table.Cell>
                            <Table.Cell className="">
                                {new Date(request.created_at).toLocaleString()}
                            </Table.Cell>
                            <Table.Cell className="">
                                <Button
                                    variant={"danger"}
                                    onClick={() =>
                                        deleteRequestMutation(request.id)
                                    }
                                >
                                    Delete
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                />
                <Pagination data={pagination} onPageChange={setPage} />
            </div>
        </div>
    );
}
