import { Outlet, redirect } from "react-router";
import { useAuthContext } from "../../core/auth/provider";
import { useEffect } from "react";

export default function AuthLayout() {
    const { user } = useAuthContext();

    useEffect(() => {
        if (user === null) redirect("/auth");
    }, [user]);

    if (user === undefined)
        return (
            <div className="w-full">
                <div className="flex flex-col container mx-auto gap-5 py-5">
                    <p>Loading...</p>
                </div>
            </div>
        );

    if (!user) return <p>Unauthorized</p>;

    return <Outlet />;
}
