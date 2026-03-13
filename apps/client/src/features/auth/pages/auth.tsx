import { useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

import { useAuthContext } from "../../../core/auth/provider";
import AuthForms from "../components/auth-forms";

export default function AuthPage() {
    const { isConnected } = useAuthContext();
    const navigate = useNavigate();

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
            <AuthForms />
        </motion.div>
    );
}
