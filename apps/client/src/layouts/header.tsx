import { Link, NavLink } from "react-router";
import { useAuthContext } from "../core/auth/provider";
import HeaderSearchMovieInput from "../shared/ui/header-search-input";

const linkCss = "font-bold hover:text-utils-orange-light duration-150";

export default function Header() {
    const { isConnected } = useAuthContext();

    return (
        <header className="h-16 p-5 border-b-1 border-b-bg-light">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/">AGREGATOR</Link>
                <div className="w-fit gap-5 items-center hidden md:flex">
                    <nav className="flex gap-3 font-bold">
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
                    </nav>
                    <HeaderSearchMovieInput css="!w-40" />
                </div>
            </div>
        </header>
    );
}
