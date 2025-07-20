import { Link, NavLink } from "react-router";
import HeaderSearchMovieInput from "../../shared/ui/header-search-input";

export default function Header() {
    return (
        <header className="h-16 p-5 border-b-1 border-b-bg-light">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/">AGREGATOR</Link>
                <div className="w-fit gap-5 items-center hidden md:flex">
                    <nav className="flex gap-3 font-bold">
                        <NavLink
                            to="/movies"
                            className={({ isActive }) => (isActive ? "" : "")}
                        >
                            Movies
                        </NavLink>
                        <NavLink className="" to="/requests">
                            Requests
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? "" : "")}
                        >
                            About
                        </NavLink>
                    </nav>
                    <HeaderSearchMovieInput css="!w-40" />
                </div>
            </div>
        </header>
    );
}
