import { Link } from "react-router";

import Button from "../../../../shared/ui/button";
import PageHeader from "../../../../shared/ui/page-header";
import Pagination from "../../../../shared/ui/pagination";
import Table from "../../../../shared/ui/table";
import useAdminUsers from "../../hooks/use-admin-users";

const columns = [
    { header: "Username", key: "Username" },
    { header: "Email", key: "email" },
    { header: "Role", key: "role" },
    { header: "Verified", key: "verified" },
    { header: "Actions", key: "actions" },
];

export default function UsersPage() {
    const { setCurrentPage, pagination, users } = useAdminUsers();

    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5">
                <PageHeader title="Users"></PageHeader>
                {users.length === 0 && (
                    <p className="text-md italic text-text-secondary">
                        There is no user
                    </p>
                )}
                <Table
                    columns={columns}
                    data={users}
                    renderRow={(user, idx) => (
                        <Table.Row idx={idx}>
                            <Table.Cell>{user.username}</Table.Cell>
                            <Table.Cell>{user.email}</Table.Cell>
                            <Table.Cell className="capitalize">
                                {user.role}
                            </Table.Cell>
                            <Table.Cell>
                                {user.verified ? "✅" : "⭕️"}
                            </Table.Cell>
                            <Table.Cell>
                                <Link to={`/admin/users/${user.id}`}>
                                    <Button variant={"primary"}>More ➜</Button>
                                </Link>
                            </Table.Cell>
                        </Table.Row>
                    )}
                />
                <Pagination data={pagination} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}
