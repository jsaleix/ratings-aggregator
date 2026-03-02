import { useEffect, useState } from "react";
import { animate, useMotionValue } from "motion/react";

interface Props {
    className?: string;
    value: number;
    duration?: number;
    delay?: number;
    onEnd?: () => void;
    onUpdate?: (value: number) => void;
}

export default function AnimatedNumber({
    className,
    value,
    duration = 2,
    delay = 0,
    onUpdate,
    onEnd,
}: Props) {
    const motionValue = useMotionValue(0);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(motionValue, value, {
            duration,
            delay,
            ease: ["easeInOut"], // expo out
            onUpdate: (latest) => {
                const val = Math.round(latest);
                setDisplay(val);
                if (onUpdate) onUpdate(val);
            },
            onComplete: () => {
                if (onEnd) onEnd();
            },
        });
        return controls.stop;
    }, [value]);

    return <span className={className}>{display}</span>;
}
