import { Link } from "react-router";
import clsx from "clsx";

import Button from "../../../../shared/ui/button";
import PageHeader from "../../../../shared/ui/page-header";
import Pagination from "../../../../shared/ui/pagination";
import useAdminUsers from "../../hooks/use-admin-users";

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
                {users.length > 0 && (
                    <div className="flex flex-col w-full">
                        <table>
                            <thead className="w-full bg-bg-medium text-left">
                                <tr>
                                    <th className="">Username</th>
                                    <th className="">Email</th>
                                    <th className="">Role</th>
                                    <th className="">Verified</th>
                                    <th className="">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, idx) => (
                                    <tr
                                        key={user.id}
                                        className={clsx(
                                            idx % 2 === 0
                                                ? "bg-bg-medium/50"
                                                : "bg-bg-medium",
                                        )}
                                    >
                                        <td title={user.id}>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td className="capitalize">
                                            {user.role}
                                        </td>
                                        <td>{user.verified ? "✅" : "⭕️"}</td>
                                        <td>
                                            <Link
                                                to={`/admin/users/${user.id}`}
                                            >
                                                <Button variant={"primary"}>
                                                    More ➜
                                                </Button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
                <Pagination data={pagination} onPageChange={setCurrentPage} />
            </div>
        </div>
    );
}
