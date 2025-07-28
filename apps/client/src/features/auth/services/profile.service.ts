import { API_ENDPOINT } from "../../../core/config/api";
import { authHeaders } from "../../../shared/api/headers";
import type { UserType } from "../types/user";

class ProfileService {
    async getSelf(): Promise<UserType | null> {
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

    async updateProfile(email: string, username: string) {
        const url = new URL("/users/me", API_ENDPOINT).toString();
        const res = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify({ email, username }),
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }

        return await res.json();
    }

    async updatePassword(currentPassword: string, newPassword: string) {
        const url = new URL("/users/me/password", API_ENDPOINT).toString();
        const res = await fetch(url, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", ...authHeaders() },
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }

        return await res.json();
    }

    async deleteProfile() {
        const url = new URL("/users/me", API_ENDPOINT).toString();
        const res = await fetch(url, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", ...authHeaders() },
        });
        if (!res.ok) {
            throw new Error(`Error fetching requests: ${res.statusText}`);
        }

        return true;
    }
}

export default new ProfileService();
