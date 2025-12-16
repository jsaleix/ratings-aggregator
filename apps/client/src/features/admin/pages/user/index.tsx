import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

import ApiUsersService from "../../services/users.service";
import PageHeader from "../../../../shared/ui/page-header";

export default function UserPage() {
    let { id } = useParams();

    const { data: user, isFetching } = useQuery({
        queryKey: ["user-full"],
        queryFn: () => {
            if (!id) throw new Error("Missing id");
            return ApiUsersService.getOneFull(id);
        },
        initialData: null,
        refetchOnWindowFocus: false,
    });

    if (isFetching || !user?.id) return;

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title={`User: ${user.username}`}></PageHeader>
            </div>
        </div>
    );
}
