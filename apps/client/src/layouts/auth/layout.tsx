import { Outlet, useNavigate } from "react-router";
import { useAuthContext } from "../../core/auth/provider";
import { useEffect } from "react";
import { notify } from "../../shared/utils/toast";

export default function AuthLayout() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            const currentUrl = window.location.pathname;
            const saveUrlInQueryParam = new URLSearchParams(
                window.location.search
            );
            saveUrlInQueryParam.set("redirect", currentUrl);
            navigate(`/auth?${saveUrlInQueryParam.toString()}`, {});
            // navigate("/auth", {
            //     state: { from: currentUrl },
            // });
            notify("You must be logged in to access this page");
        }
    }, [user]);

    if (user === undefined)
        return (
            <div className="w-full">
                <div className="flex flex-col container mx-auto gap-5 py-5">
                    <p>Loading...</p>
                </div>
            </div>
        );

    if (!user)
        return (
            <div className="w-full">
                <div className="flex flex-col container mx-auto gap-5 py-5">
                    <p>Unauthorized</p>
                </div>
            </div>
        );

    return <Outlet />;
}
