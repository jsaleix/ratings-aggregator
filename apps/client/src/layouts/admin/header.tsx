import { Link } from "react-router";

export default function AdminHeader() {
    return (
        <div className="border-b-1 border-b-bg-light h-10">
            <div className="container mx-auto flex items-center justify-between h-full w-full">
                <nav className="flex gap-5">
                    <Link to="/admin" className="hover:underline">
                        Dashboard
                    </Link>
                    <Link to="/admin/users" className="hover:underline">
                        Users
                    </Link>
                    <Link to="/admin/movies" className="hover:underline">
                        Movies
                    </Link>
                    <Link to="/admin/requests" className="hover:underline">
                        Requests
                    </Link>
                </nav>
            </div>
        </div>
    );
}
