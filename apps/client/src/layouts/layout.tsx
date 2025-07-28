import { Outlet, useNavigate } from "react-router";

import { useAuthContext } from "../core/auth/provider";
import Header from "./header";
import Footer from "./footer";
import { useEffect } from "react";

export default function BaseLayout() {
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.id) {
            const queryParam = new URLSearchParams(window.location.search);
            const redirect = queryParam.get("redirect");
            if (redirect) {
                navigate(redirect);
            }
        }
    }, [user]);

    return (
        <div className="w-full h-full flex flex-col">
            <Header />
            <div className="w-full h-full grow bg-bg-dark">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}
