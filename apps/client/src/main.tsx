import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router";
import { QueryClientProvider } from "@tanstack/react-query";

import "./shared/api/fetch.ts";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { queryClient } from "./core/query-client.ts";
import { AuthContextProvider } from "./core/auth/provider.tsx";
import ScrollToTop from "./shared/ui/scroll-to-top.tsx";
import App from "./App.tsx";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthContextProvider>
                <BrowserRouter>
                    <App />
                    <ScrollToTop />
                </BrowserRouter>
            </AuthContextProvider>
            <ToastContainer />
        </QueryClientProvider>
    </StrictMode>
);
