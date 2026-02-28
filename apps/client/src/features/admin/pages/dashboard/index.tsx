import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../../../shared/ui/page-header";
import ApiAdminStatsService from "../../services/stats.admin.service";

export default function Dashboard() {
    const { data } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: () => {
            return ApiAdminStatsService.getAll();
        },
        initialData: {
            users: { total: -1, active: -1 },
            movies: { total: -1 },
            requests: { total: -1 },
        },
    });

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title="Dashboard"></PageHeader>
                <div className="bg-slate-600 rounded-md shadow-md flex gap-10 p-5 items-center">
                    <article className="flex flex-col gap-3">
                        <figure className="text-6xl">{data.users.total}</figure>
                        <span className="text-xl">Users</span>
                    </article>
                    <div className="inline-block h-10 w-0.5 bg-bg-light"></div>{" "}
                    <article className="flex flex-col gap-3">
                        <figure className="text-6xl">
                            {data.movies.total}
                        </figure>
                        <span className="text-xl">Movies</span>
                    </article>
                    <div className="inline-block h-10 w-0.5 bg-bg-light"></div>{" "}
                    <article className="flex flex-col gap-3">
                        <figure className="text-6xl">
                            {data.requests.total}
                        </figure>
                        <span className="text-xl">Requests</span>
                    </article>
                </div>
            </div>
        </div>
    );
}
