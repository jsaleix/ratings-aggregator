import PageHeader from "../../../../shared/ui/page-header";
import useInfiniteUsers from "../../hooks/use-infinite-users";

export default function UsersPage() {
    const { users } = useInfiniteUsers();

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
                        <ul>
                            {users.map((user) => (
                                <li>{user.id} - {user.email}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
