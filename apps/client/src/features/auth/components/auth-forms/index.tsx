import { useState } from "react";
import { motion } from "motion/react";

import LoginForm from "../login-form";
import SignupForm from "../signup-form";

interface Props {}

export default function AuthForms({}: Props) {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <motion.div
            layout
            transition={{ duration: 0.1 }}
            className="flex flex-col md:flex-row w-full min-h-[48vh] max-w-4xl rounded-2xl overflow-hidden shadow-lg bg-bg-medium"
        >
            <div
                className="
                        w-full md:w-1/2
                        h-48 md:h-auto
                        bg-[url('/assets/images/auth/apocalypse_now.webp')]
                        bg-cover bg-center
                    "
            ></div>

            <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8 md:px-12">
                {!showLogin ? (
                    <SignupForm containerCss="w-full max-w-sm" onSuccess={() => setShowLogin(true)} />
                ) : (
                    <LoginForm containerCss="w-full max-w-sm" />
                )}
                <button
                    onClick={() => setShowLogin((prev) => !prev)}
                    className="mt-4 text-sm text-text-secondary hover:underline"
                >
                    {showLogin
                        ? "No account yet? Sign-up now >"
                        : "Already a member? Login >"}
                </button>
            </div>
        </motion.div>
    );
}
