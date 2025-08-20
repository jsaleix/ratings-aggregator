import { useEffect } from "react";
import { useNavigate } from "react-router";

import { useAuthContext } from "../../../core/auth/provider";
import PageHeader from "../../../shared/ui/page-header";
import LoginForm from "../components/login-form";
import ProsPart from "../components/pros-parts";
import SignupForm from "../components/signup-form";

export default function AuthPage() {
    const {isConnected} = useAuthContext()
    const navigate = useNavigate();

    useEffect(()=>{
        if(isConnected) navigate("/")
    }, [isConnected])
    
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Join" />
                <ProsPart />
                <div className="flex w-full flex-col md:flex-row gap-3">
                    <SignupForm containerCss="w-full md:w-1/2 px-5 md:px-15 py-5 bg-bg-medium h-fit" />
                    <LoginForm containerCss="w-full md:w-1/2 px-5 md:px-15 py-5 bg-bg-medium h-fit" />
                </div>
            </div>
        </div>
    );
}
