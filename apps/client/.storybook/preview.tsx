import type { Preview } from "@storybook/react-vite";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/index.css";

const client = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            // staleTime: Infinity,
        },
    },
});

const preview: Preview = {
    decorators: [
        (Story) => (
            <QueryClientProvider client={client}>
                <MemoryRouter>
                    <Story />
                    <ToastContainer />
                </MemoryRouter>
            </QueryClientProvider>
        ),
    ],
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
};

export default preview;
