import { useState } from "react";
import { useNavigate } from "react-router";
import clsx from "clsx";

import MagnifyingGlass from "../icons/magnifying-glass";

interface Props {
    css?: string;
    test?: (val: string) => void;
}

export default function HeaderSearchMovieInput({ css, test }: Props) {
    const [value, setValue] = useState("");
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();

    const containerCss = clsx(
        "w-full flex items-center bg-bg-medium flex gap-1 rounded-2xl px-3 py-1 border-1 border-transparent hover:border-primary data-active:border-utils-orange-light group duration-150",
        css,
    );

    const goToResults = () => {
        if (value.length === 0) return;
        const url = `/movies/search?query=${value}`;
        navigate(url);
        test && test(url);
        setValue("");
    };

    return (
        <div
            className={containerCss}
            data-active={isActive ? isActive : undefined}
        >
            <MagnifyingGlass />
            <input
                onBlur={() => {
                    setValue("");
                    setIsActive(false);
                }}
                onInput={() => setIsActive(true)}
                onClick={() => setIsActive(true)}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.code === "Enter" && goToResults()}
                type="text"
                className="bg-transparent w-full outline-none"
                placeholder="Search a movie"
            />
            {value && (
                <svg
                    onMouseDown={(e) => {
                        e.preventDefault();
                        goToResults();
                    }}
                    className="cursor-pointer hover:opacity-70 duration-150"
                    width="15"
                    height="11"
                    viewBox="0 0 15 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M8.293 0.292786C8.48053 0.105315 8.73484 0 9 0C9.26516 0 9.51947 0.105315 9.707 0.292786L14.207 4.79279C14.3945 4.98031 14.4998 5.23462 14.4998 5.49979C14.4998 5.76495 14.3945 6.01926 14.207 6.20679L9.707 10.7068C9.5184 10.8889 9.2658 10.9897 9.0036 10.9875C8.7414 10.9852 8.49059 10.88 8.30518 10.6946C8.11977 10.5092 8.0146 10.2584 8.01233 9.99619C8.01005 9.73399 8.11084 9.48139 8.293 9.29279L11 6.49979H1.5C1.23478 6.49979 0.98043 6.39443 0.792893 6.20689C0.605357 6.01936 0.5 5.765 0.5 5.49979C0.5 5.23457 0.605357 4.98022 0.792893 4.79268C0.98043 4.60514 1.23478 4.49979 1.5 4.49979H11L8.293 1.70679C8.10553 1.51926 8.00021 1.26495 8.00021 0.999786C8.00021 0.734622 8.10553 0.480314 8.293 0.292786Z"
                        fill="white"
                    />
                </svg>
            )}
        </div>
    );
}
