import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

import { useAuthContext } from "../../../core/auth/provider";
import LoginForm from "../components/login-form";
import SignupForm from "../components/signup-form";

export default function AuthPage() {
    const { isConnected } = useAuthContext();
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        if (isConnected) navigate("/");
    }, [isConnected, navigate]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center items-center h-fit bg-bg-dark py-10 px-4"
            transition={{ duration: 0.8, delay: 0.5 }}
        >
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

                <div className="flex flex-col justify-center items-center w-full md:w-1/2 p-8">
                    {!isLogin ? (
                        <SignupForm containerCss="w-full max-w-sm" />
                    ) : (
                        <LoginForm containerCss="w-full max-w-sm" />
                    )}
                    <button
                        onClick={() => setIsLogin((prev) => !prev)}
                        className="mt-4 text-sm text-text-secondary hover:underline"
                    >
                        {isLogin
                            ? "No account yet? Sign-up now >"
                            : "Already a member? Login >"}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    );
}
