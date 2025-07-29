import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

import { useAuthContext } from "../../core/auth/provider";
import AdminHeader from "./header";

export default function AdminLayout() {
    const { role } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (role !== "admin") navigate("/");
    }, []);

    if (role !== "admin") return <p>Unauthorized</p>;

    return (
        <>
            <AdminHeader />
            <Outlet />
        </>
    );
}
