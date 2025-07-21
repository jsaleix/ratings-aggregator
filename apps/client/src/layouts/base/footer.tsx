export default function Footer() {
    return (
        <footer className="h-32 p-5 border-t-1 border-b-bg-light">
            <div className="container mx-auto flex flex-col center">
                <p className="font-light text-sm text-text-secondary">
                    © Agregator
                </p>
                <p className="font-light text-sm text-text-secondary">
                    Data from{" "}
                    <a
                        className="underline"
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
