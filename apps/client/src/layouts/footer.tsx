export default function Footer() {
    return (
        <footer className="h-32 p-5">
            <div className="container mx-auto flex flex-col center">
                <p className="font-light text-sm text-text-secondary">
                    © Aggregator
                </p>
                <p className="font-light text-sm text-text-secondary">
                    Movies data from{" "}
                    <a
                        className="link"
                        href="https://www.themoviedb.org/"
                        target="_blank"
                    >
                        TMDB
                    </a>
                </p>
            </div>
        </footer>
    );
}
