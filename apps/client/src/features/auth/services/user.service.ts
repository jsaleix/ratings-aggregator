import { mockUserProfile } from "../../../assets/data-test/user";
import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import { sleep } from "../../../shared/utils";
import type { UserType } from "../types/user";

class UserService {
    async getSelf(): Promise<UserType | null> {
        const url = new URL("/users/me", API_ENDPOINT).toString();
        await sleep(5);
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }
        return (await res.json()) as UserType;
        // return mockUserProfile;
    }

    async signup(email: string, password: string) {
        return false;
    }

    async login(email: string, password: string) {
        return false;
    }
}

export default new UserService();
