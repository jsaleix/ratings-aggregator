import { useParams } from "react-router";

export default function MoviePage() {
    let { id } = useParams();

    return <div>Movie page for {id}</div>;
}
