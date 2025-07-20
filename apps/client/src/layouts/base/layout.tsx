import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function BaseLayout() {
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
