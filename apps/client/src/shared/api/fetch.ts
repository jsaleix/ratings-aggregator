import { API_ENDPOINT } from "../../core/config/api";

const oldFetch = window.fetch;

const newFetch = async (
    url: RequestInfo | URL,
    options: RequestInit | undefined = {}
) => {
    if (url.toString().startsWith(API_ENDPOINT))
        options.credentials = "include";
    return oldFetch(url, options);
};

window.fetch = newFetch;
