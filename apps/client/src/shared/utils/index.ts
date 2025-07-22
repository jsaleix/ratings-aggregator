export const sleep = (durationMs: number = 1) =>
    new Promise((r) => setTimeout(r, durationMs * 1000));
