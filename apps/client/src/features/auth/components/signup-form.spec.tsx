import React from "react";
import {
    render,
    screen,
    fireEvent,
    cleanup,
    waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";

describe("Features/Auth/SignupForm", () => {
    afterEach(() => {
        cleanup();
        vi.resetAllMocks();
        vi.resetModules();
    });

    test("renders fields and Join button (disabled initially)", async () => {
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));
        const { default: SignupForm } = await import("./signup-form");
        render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i);
        const username = screen.getByPlaceholderText(/username/i);
        const password = screen.getByPlaceholderText(/password$/i);
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        );
        const checkbox = screen.getByRole("checkbox");
        const button = screen.getByRole("button", { name: /join/i });

        expect(email).not.toBeNull();
        expect(username).not.toBeNull();
        expect(password).not.toBeNull();
        expect(passwordConfirm).not.toBeNull();
        expect(checkbox).not.toBeNull();
        expect(button).not.toBeNull();
        expect((button as HTMLButtonElement).disabled).toBe(true);
    });

    test("fills and submits form, calls userService.signup with correct payload", async () => {
        const mockSignup = vi.fn(() => Promise.resolve(true));

        // Mock userService before importing the component
        vi.doMock("../services/user.service", () => ({
            default: { signup: mockSignup },
        }));
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));

        const { default: SignupForm } = await import("./signup-form");

        const { container } = render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        const username = screen.getByPlaceholderText(
            /username/i
        ) as HTMLInputElement;
        const password = screen.getByPlaceholderText(
            /password$/i
        ) as HTMLInputElement;
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        ) as HTMLInputElement;
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        // Fill inputs with values likely to pass validation
        fireEvent.change(email, { target: { value: "user@example.com" } });
        fireEvent.change(username, { target: { value: "tester" } });
        fireEvent.change(password, { target: { value: "Secret123!" } });
        fireEvent.change(passwordConfirm, { target: { value: "Secret123!" } });
        fireEvent.click(checkbox);

        // Submit the form directly
        const formEl = container.querySelector("form") as HTMLFormElement;
        expect(formEl).toBeTruthy();

        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockSignup).toHaveBeenCalled();
            // Ensure called with an object containing our values
            expect(mockSignup).toHaveBeenCalledWith(
                expect.objectContaining({
                    email: "user@example.com",
                    username: "tester",
                    password: "Secret123!",
                    password_confirmation: "Secret123!",
                    gcu: true,
                })
            );
        });
    });

    test("rejects password without uppercase letter", async () => {
        const mockSignup = vi.fn(() => Promise.resolve(true));
        vi.doMock("../services/user.service", () => ({
            default: { signup: mockSignup },
        }));
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));

        const { default: SignupForm } = await import("./signup-form");
        const { container } = render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        const username = screen.getByPlaceholderText(
            /username/i
        ) as HTMLInputElement;
        const password = screen.getByPlaceholderText(
            /password$/i
        ) as HTMLInputElement;
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        ) as HTMLInputElement;
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        fireEvent.change(email, { target: { value: "user2@example.com" } });
        fireEvent.change(username, { target: { value: "tester2" } });
        // no uppercase
        fireEvent.change(password, { target: { value: "secret123!" } });
        fireEvent.change(passwordConfirm, { target: { value: "secret123!" } });
        fireEvent.click(checkbox);

        const formEl = container.querySelector("form") as HTMLFormElement;
        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockSignup).not.toHaveBeenCalled();
        });
    });

    test("rejects password without lowercase letter", async () => {
        const mockSignup = vi.fn(() => Promise.resolve(true));
        vi.doMock("../services/user.service", () => ({
            default: { signup: mockSignup },
        }));
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));

        const { default: SignupForm } = await import("./signup-form");
        const { container } = render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        const username = screen.getByPlaceholderText(
            /username/i
        ) as HTMLInputElement;
        const password = screen.getByPlaceholderText(
            /password$/i
        ) as HTMLInputElement;
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        ) as HTMLInputElement;
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        fireEvent.change(email, { target: { value: "user3@example.com" } });
        fireEvent.change(username, { target: { value: "tester3" } });
        // no lowercase
        fireEvent.change(password, { target: { value: "SECRET123!" } });
        fireEvent.change(passwordConfirm, { target: { value: "SECRET123!" } });
        fireEvent.click(checkbox);

        const formEl = container.querySelector("form") as HTMLFormElement;
        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockSignup).not.toHaveBeenCalled();
        });
    });

    test("rejects password without special character", async () => {
        const mockSignup = vi.fn(() => Promise.resolve(true));
        vi.doMock("../services/user.service", () => ({
            default: { signup: mockSignup },
        }));
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));

        const { default: SignupForm } = await import("./signup-form");
        const { container } = render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        const username = screen.getByPlaceholderText(
            /username/i
        ) as HTMLInputElement;
        const password = screen.getByPlaceholderText(
            /password$/i
        ) as HTMLInputElement;
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        ) as HTMLInputElement;
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        fireEvent.change(email, { target: { value: "user4@example.com" } });
        fireEvent.change(username, { target: { value: "tester4" } });
        // no special char
        fireEvent.change(password, { target: { value: "Secret123" } });
        fireEvent.change(passwordConfirm, { target: { value: "Secret123" } });
        fireEvent.click(checkbox);

        const formEl = container.querySelector("form") as HTMLFormElement;
        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockSignup).not.toHaveBeenCalled();
        });
    });

    test("rejects password without digit", async () => {
        const mockSignup = vi.fn(() => Promise.resolve(true));
        vi.doMock("../services/user.service", () => ({
            default: { signup: mockSignup },
        }));
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));

        const { default: SignupForm } = await import("./signup-form");
        const { container } = render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        const username = screen.getByPlaceholderText(
            /username/i
        ) as HTMLInputElement;
        const password = screen.getByPlaceholderText(
            /password$/i
        ) as HTMLInputElement;
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        ) as HTMLInputElement;
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        fireEvent.change(email, { target: { value: "user5@example.com" } });
        fireEvent.change(username, { target: { value: "tester5" } });
        // no digit
        fireEvent.change(password, { target: { value: "Secret!!!" } });
        fireEvent.change(passwordConfirm, { target: { value: "Secret!!!" } });
        fireEvent.click(checkbox);

        const formEl = container.querySelector("form") as HTMLFormElement;
        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockSignup).not.toHaveBeenCalled();
        });
    });

    test("rejects password shorter than 8 characters", async () => {
        const mockSignup = vi.fn(() => Promise.resolve(true));
        vi.doMock("../services/user.service", () => ({
            default: { signup: mockSignup },
        }));
        vi.doMock("react-router", () => ({
            Link: (props: any) =>
                React.createElement(
                    "a",
                    { ...props, href: props.to },
                    props.children
                ),
        }));

        const { default: SignupForm } = await import("./signup-form");
        const { container } = render(<SignupForm />);

        const email = screen.getByPlaceholderText(/email/i) as HTMLInputElement;
        const username = screen.getByPlaceholderText(
            /username/i
        ) as HTMLInputElement;
        const password = screen.getByPlaceholderText(
            /password$/i
        ) as HTMLInputElement;
        const passwordConfirm = screen.getByPlaceholderText(
            /password confirmation/i
        ) as HTMLInputElement;
        const checkbox = screen.getByRole("checkbox") as HTMLInputElement;

        fireEvent.change(email, { target: { value: "short@example.com" } });
        fireEvent.change(username, { target: { value: "shorty" } });

        fireEvent.change(password, { target: { value: "Ab1!" } });
        fireEvent.change(passwordConfirm, { target: { value: "Ab1!" } });
        fireEvent.click(checkbox);

        const formEl = container.querySelector("form") as HTMLFormElement;
        fireEvent.submit(formEl!);

        await waitFor(() => {
            expect(mockSignup).not.toHaveBeenCalled();
        });
    });
});
