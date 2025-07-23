import CheckIcon from "../../../shared/ui/icons/check-icon";
import PageHeader from "../../../shared/ui/page-header";
import LoginForm from "../components/login-form";
import SignupForm from "../components/signup-form";

function AuthPros({ text }: { text: string }) {
    return (
        <article className="w-fit flex gap-3 items-center">
            <i>
                <CheckIcon size={30} circleClassName="fill-gray-100" />
            </i>
            <h3 className="select-none">{text}</h3>
        </article>
    );
}

const pros = ["Quick and free signup", "Submit your own movies"];

export default function AuthPage() {
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="Join" />
                <div className="w-full bg-linear-to-r/longer from-indigo-500 to-teal-400 min-h-[10vh] rounded-md p-5 flex flex-row gap-10">
                    {pros.map((pro, idx) => (
                        <AuthPros key={idx} text={pro} />
                    ))}
                </div>
                <div className="flex w-full flex-col md:flex-row gap-3">
                    <SignupForm containerCss="w-full md:w-1/2 px-5 md:px-15 py-5 bg-bg-medium h-fit" />
                    <LoginForm containerCss="w-full md:w-1/2 px-5 md:px-15 py-5 bg-bg-medium h-fit" />
                </div>
            </div>
        </div>
    );
}
