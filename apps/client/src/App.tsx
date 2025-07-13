import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router";

import HomePage from "./features/movies/pages/home";
import NotFoundPage from "./features/general/not-found";

const MoviePage = lazy(() => import("./features/movies/pages/movie"));

function App() {
    return (
        <Suspense>
            <Routes>
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Suspense>
    );
}

export default App;
