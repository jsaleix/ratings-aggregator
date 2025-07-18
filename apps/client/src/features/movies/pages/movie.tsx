import { useParams } from "react-router";

export default function MoviePage() {
    let { id } = useParams();

    return <div className="flex h-full">Movie page for {id}</div>;
}
