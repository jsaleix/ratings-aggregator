import { mockUserProfile } from "../../../assets/data-test/user";
import { API_ENDPOINT } from "../../../core/config/api";
import { sleep } from "../../../shared/utils";
import type { UserType } from "../types/user";

class UserService {
    async getSelf(): Promise<UserType | null> {
        const url = new URL("/users/me", API_ENDPOINT).toString();
        await sleep(5);
        // const res = await fetch(url, {
        //     method: "GET",
        //     headers: { "Content-Type": "application/json", ...authHeaders() },
        // });
        // if (!res.ok) {
        //     throw new Error(`Error fetching requests: ${res.statusText}`);
        // }
        return mockUserProfile;
    }
}

export default new UserService();
