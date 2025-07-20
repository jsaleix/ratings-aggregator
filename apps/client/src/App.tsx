import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./features/movies/pages/home";
import NotFoundPage from "./features/general/not-found";
import BaseLayout from "./layouts/base/layout";

const MoviePage = lazy(() => import("./features/movies/pages/movie"));
const MoviesPage = lazy(() => import("./features/movies/pages/movies"));

function App() {
    return (
        <Suspense>
            <Routes>
                <Route element={<BaseLayout />}>
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Suspense>
    );
}

export default App;
