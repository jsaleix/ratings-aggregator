import { Link, NavLink } from "react-router";
import clsx from "clsx";

import { useAuthContext } from "../core/auth/provider";
import HeaderSearchMovieInput from "../shared/ui/header-search-input";

const linkCss = "font-bold hover:text-secondary duration-150";

export default function Header() {
    const { isConnected, role } = useAuthContext();

    return (
        <header className="h-16 p-5 border-b-1 border-b-bg-light bg-bg-dark">
            <div className="container mx-auto flex items-center justify-between h-full w-full">
                <Link to="/" className="h-full">
                    <div className="h-full hover:opacity-85 active:opacity-85 duration-150">
                        <img
                            src="/logo.svg"
                            alt="Aggregator"
                            className="object-contain w-full h-full select-none drag-none"
                        />
                    </div>
                </Link>
                <div className="w-fit gap-5 items-center hidden md:flex">
                    <nav className="flex gap-3 font-bold uppercase">
                        {isConnected ? (
                            <NavLink to="/profile" className={linkCss}>
                                Profile
                            </NavLink>
                        ) : (
                            <NavLink to="/auth" className={linkCss}>
                                Signin
                            </NavLink>
                        )}
                        <NavLink to="/movies" className={linkCss}>
                            Movies
                        </NavLink>
                        <NavLink className={linkCss} to="/requests">
                            Requests
                        </NavLink>
                        <NavLink to="/about" className={linkCss}>
                            About
                        </NavLink>
                        {role === "admin" && (
                            <NavLink to="/admin" className={clsx(linkCss, "text-green-400")}>
                                ADMIN
                            </NavLink>
                        )}
                    </nav>
                    <HeaderSearchMovieInput css="!w-40" />
                </div>
            </div>
        </header>
    );
}
