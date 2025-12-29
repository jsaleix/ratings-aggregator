import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import clsx from "clsx";

import { useAuthContext } from "../core/auth/provider";
import HeaderSearchMovieInput from "../shared/ui/header-search-input";
import BurgerMenu from "../shared/ui/layout/burger";
import { ROLES } from "../core/auth/constants";

const linkCss = "font-bold hover:text-secondary duration-150 w-fit";

export default function Header() {
    const { isConnected, role } = useAuthContext();
    const [isMobileMenuOpen, setOpenMobileMenu] = useState(false);
    const location = useLocation();

    useEffect(() => {
        isMobileMenuOpen && setOpenMobileMenu(false);
    }, [location]);

    return (
        <header className="relative h-16 p-5 bg-bg-dark w-full">
            <div className="container mx-auto flex items-center justify-between h-full w-full">
                <Link to="/" className="h-full z-100">
                    <div className="h-full hover:opacity-85 active:opacity-85 duration-150">
                        <img
                            src="/logo.svg"
                            alt="Aggregator"
                            className="object-contain w-full h-full select-none drag-none"
                        />
                    </div>
                </Link>
                <div className="w-fit flex md:hidden z-20">
                    <BurgerMenu
                        toggle={(val) => setOpenMobileMenu(val)}
                        open={isMobileMenuOpen}
                        css={"!z-100"}
                    />
                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 bg-bg-dark/80 pt-5 pl-5 backdrop-blur-sm">
                            <nav className="flex flex-col pt-16 gap-5 font-bold uppercase text-4xl">
                                <HeaderSearchMovieInput css="!w-[80vw]" />
                                {isConnected ? (
                                    <NavLink to="/profile" className={linkCss}>
                                        Profile
                                    </NavLink>
                                ) : (
                                    <NavLink to="/auth" className={linkCss}>
                                        Sign-up
                                    </NavLink>
                                )}
                                <NavLink to="/movies" className={linkCss}>
                                    Movies
                                </NavLink>
                                <NavLink className={linkCss} to="/requests">
                                    Add a movie
                                </NavLink>
                                <NavLink to="/about" className={linkCss}>
                                    About
                                </NavLink>
                                {role === ROLES.ADMIN && (
                                    <NavLink
                                        to="/admin"
                                        className={clsx(
                                            linkCss,
                                            "text-green-400"
                                        )}
                                    >
                                        ADMIN
                                    </NavLink>
                                )}
                            </nav>
                        </div>
                    )}
                </div>
                <div className="w-fit gap-5 items-center hidden md:flex">
                    <nav className="flex gap-3 font-bold uppercase">
                        {isConnected ? (
                            <NavLink to="/profile" className={linkCss}>
                                Profile
                            </NavLink>
                        ) : (
                            <NavLink to="/auth" className={linkCss}>
                                Sign-Up
                            </NavLink>
                        )}
                        <NavLink to="/movies" className={linkCss}>
                            Movies
                        </NavLink>
                        <NavLink className={linkCss} to="/requests">
                            Add a movie
                        </NavLink>
                        <NavLink to="/about" className={linkCss}>
                            About
                        </NavLink>
                        {role === ROLES.ADMIN && (
                            <NavLink
                                to="/admin"
                                className={clsx(linkCss, "text-green-400")}
                            >
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
