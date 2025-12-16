import { useQuery } from "@tanstack/react-query";
import PageHeader from "../../../../shared/ui/page-header";
import ApiStatsService from "../../services/stats.service";

export default function Dashboard() {
    const { data } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: () => {
            return ApiStatsService.getAll();
        },
        initialData: {
            users: -1,
            movies: -1,
            requests: -1,
        },
    });
    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title="Dashboard"></PageHeader>
                <div className="bg-slate-600 rounded-md shadow-md flex gap-10 p-5 items-center">
                    <article className="flex flex-col gap-3">
                        <figure className="text-6xl">{data.users}</figure>
                        <span className="text-xl">Users</span>
                    </article>
                    <div className="inline-block h-10 w-0.5 bg-bg-light"></div>{" "}
                    <article className="flex flex-col gap-3">
                        <figure className="text-6xl">{data.movies}</figure>
                        <span className="text-xl">Movies</span>
                    </article>
                    <div className="inline-block h-10 w-0.5 bg-bg-light"></div>{" "}
                    <article className="flex flex-col gap-3">
                        <figure className="text-6xl">{data.requests}</figure>
                        <span className="text-xl">Requests</span>
                    </article>
                </div>
            </div>
        </div>
    );
}
