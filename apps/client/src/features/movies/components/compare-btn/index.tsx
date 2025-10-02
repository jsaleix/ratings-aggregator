import { Link } from "react-router";
import Button from "../../../../shared/ui/button";
import ArrowIcon from "../../../../shared/ui/icons/arrow-icon";

interface Props {
    movieId: string;
}

export default function CompareBtn({ movieId }: Props) {
    return (
        <Link to={`/compare?a=${movieId}`} className="block group w-fit">
            <Button
                variant={"secondary"}
                className="text-black flex items-center gap-3"
            >
                Compare{" "}
                <ArrowIcon className="fill-black group-hover:translate-x-1.5 duration-150" />
            </Button>
        </Link>
    );
}
