import { useParams } from "react-router";

import PageHeader from "../../../../shared/ui/page-header";
import AdminAccountForm from "../../../auth/components/admin/account-form";
import useUser from "../../hooks/use-user";

export default function UserPage() {
    let { id } = useParams();
    if (!id) return;

    const { user, isFetching, updateUserMutation } = useUser(id);

    if (isFetching || !user?.id) return;

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title={`User: ${user.username}`}></PageHeader>
                <div className="flex flex-col w-full">
                    <AdminAccountForm
                        user={user}
                        updateAction={async (data) => updateUserMutation(data)}
                    />
                </div>
            </div>
        </div>
    );
}
