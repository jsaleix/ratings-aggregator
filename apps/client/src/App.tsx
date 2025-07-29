import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useParams, useLocation } from "react-router";

import HomePage from "./features/general/pages/home";
import NotFoundPage from "./features/general/pages/not-found";

import BaseLayout from "./layouts/layout";
import AuthLayout from "./layouts/auth/layout";
import { useAuthContext } from "./core/auth/provider";

const AboutPage = lazy(() => import("./features/general/pages/about"));

const MoviePage = lazy(() => import("./features/movies/pages/movie"));
const MoviesPage = lazy(() => import("./features/movies/pages/movies"));
const SearchMoviesPage = lazy(() => import("./features/movies/pages/search"));

const RequestsPage = lazy(() => import("./features/requests/pages/requests"));
const CreateRequestsPage = lazy(
    () => import("./features/requests/pages/new-request")
);

const AuthPage = lazy(() => import("./features/auth/pages/auth"));
const ProfilePage = lazy(() => import("./features/auth/pages/profile"));

function App() {
    const { pathname } = useLocation();
    const { isConnected } = useAuthContext();

    useEffect(() => {
        document.title = "Aggregator";
    }, [pathname]);

    return (
        <Suspense>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route element={<AuthLayout />}>
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route
                            path="/requests/create"
                            element={<CreateRequestsPage />}
                        />
                    </Route>

                    {!isConnected && (
                        <Route path="/auth" element={<AuthPage />} />
                    )}

                    <Route path="/requests" element={<RequestsPage />} />
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route
                        path="/movies/search"
                        element={<SearchMoviesPage />}
                    />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
