import CheckIcon from "../../../shared/ui/icons/check-icon";

function AuthPros({ text }: { text: string }) {
    return (
        <article className="w-fit flex gap-3 items-center">
            <i>
                <CheckIcon
                    size={30}
                    className="drop-shadow-lg drop-shadow-white/40"
                    circleClassName="fill-gray-100 "
                />
            </i>
            <h3 className="select-none text-shadow-lg text-shadow-white/40 stroke-1 text-white text-lg">
                {text}
            </h3>
        </article>
    );
}

const pros = ["Quick and free signup", "Submit your own movies"];

export default function ProsPart() {
    return (
        <div className="w-full bg-linear-to-r/longer from-indigo-500 to-teal-400 min-h-[10vh] rounded-md p-5 flex flex-row gap-10">
            {pros.map((pro, idx) => (
                <AuthPros key={idx} text={pro} />
            ))}
        </div>
    );
}
