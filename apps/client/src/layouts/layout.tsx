import { Outlet, useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

import { useAuthContext } from "../core/auth/provider";
import Header from "./header";
import Footer from "./footer";

export default function BaseLayout() {
    const { user } = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (user?.id) {
            const redirect = location.state?.redirect;
            if (redirect) navigate(redirect);
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
