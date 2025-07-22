import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./features/general/home";
import NotFoundPage from "./features/general/not-found";
import BaseLayout from "./layouts/base/layout";

const AboutPage = lazy(() => import("./features/general/about"));

const MoviePage = lazy(() => import("./features/movies/pages/movie"));
const MoviesPage = lazy(() => import("./features/movies/pages/movies"));
const SearchMoviesPage = lazy(() => import("./features/movies/pages/search"));

const RequestsPage = lazy(() => import("./features/requests/pages/requests"));
const CreateRequestsPage = lazy(
    () => import("./features/requests/pages/new-request")
);

const AuthPage = lazy(() => import("./features/auth/pages/auth"));

function App() {
    return (
        <Suspense>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route
                        path="/requests/create"
                        element={<CreateRequestsPage />}
                    />
                    <Route path="/auth" element={<AuthPage />} />
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
