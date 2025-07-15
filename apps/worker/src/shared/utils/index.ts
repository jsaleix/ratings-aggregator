export async function sleep(ms: number = 500) {
    return new Promise((r) => setTimeout(r, ms));
}
