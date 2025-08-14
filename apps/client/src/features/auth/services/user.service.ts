import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { SignupType } from "../types/auth";
import type { SignupReturnType, UserType } from "../types/user";

class UserService {
    async getSelf(): Promise<UserType> {
        const url = new URL("/users/me", API_ENDPOINT).toString();
        const res = await fetch(url, {
            method: "GET",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }
        return (await res.json()) as UserType;
    }

    async signup(data: SignupType) {
        const url = new URL("/auth/signup", API_ENDPOINT).toString();
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data }),
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }
        return (await res.json()) as SignupReturnType;
    }

    async login(email: string, password: string) {
        const url = new URL("/auth/login", API_ENDPOINT).toString();
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }
        return (await res.json()) as { token: string };
    }
}

export default new UserService();
