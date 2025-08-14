export const authHeaders = () => {
    const headers: Record<string, string> = {};
    // const token = localStorage.getItem(STORAGE_TOKEN_KEY);
    // if (token) headers["Authorization"] = `Bearer ${token}`;
    return headers;
};
