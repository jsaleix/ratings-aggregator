import {
    render,
    screen,
    fireEvent,
    cleanup,
    waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("Features/Auth/LoginForm", () => {
    afterEach(() => {
        cleanup();
        vi.resetAllMocks();
        vi.resetModules();
    });

    test("renders fields and submit button (disabled initially)", async () => {
        const { default: LoginForm } = await import("./login-form");
        render(<LoginForm />);

        const email = screen.getByPlaceholderText(/email/i);
        const password = screen.getByPlaceholderText(/password/i);
        const button = screen.getByRole("button", { name: /login/i });

        expect(email).not.toBeNull();
        expect(password).not.toBeNull();
        expect(button).not.toBeNull();
        // Button should be disabled initially (until fields are touched/valid)
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    test("submits form and calls login with entered credentials", async () => {
        const mockLogin = vi.fn(() => Promise.resolve(true));

        // Mock the auth provider hook used by the component BEFORE importing the component
        // Use doMock to avoid hoisting issues that would make `mockLogin` undefined
        vi.doMock("../../../core/auth/provider", () => ({
            useAuthContext: () => ({
                login: mockLogin,
            }),
        }));

        const { default: LoginForm } = await import("./login-form");

        const { container } = render(<LoginForm />);

        const email = screen.getByPlaceholderText(/email/i);
        const password = screen.getByPlaceholderText(/password/i);

        fireEvent.change(email, { target: { value: "test@example.com" } });
        fireEvent.change(password, { target: { value: "secret123" } });

        const formEl = container.querySelector("form") as HTMLFormElement;
        expect(formEl).toBeTruthy();

        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith(
                "test@example.com",
                "secret123"
            );
        });
    });
});
