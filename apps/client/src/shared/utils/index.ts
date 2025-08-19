export const sleep = (durationInSeconds: number = 1) =>
    new Promise((r) => setTimeout(r, durationInSeconds * 1000));
