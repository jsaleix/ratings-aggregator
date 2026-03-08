import type { Preview } from "@storybook/react-vite";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../src/index.css";

const preview: Preview = {
    decorators: [
        (Story) => (
            <>
                <Story />
                <ToastContainer />
            </>
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
