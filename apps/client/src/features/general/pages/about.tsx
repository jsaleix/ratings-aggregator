import PageHeader from "../../../shared/ui/page-header";

export default function AboutPage() {
    return (
        <div className="w-full">
            <div className="flex flex-col container mx-auto gap-5 py-5 px-5 md:px-0">
                <PageHeader title="About">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl text-white font-bold">
                            Purpose
                        </h2>

                        <p className="">
                            This site is a personal project built to make movie
                            discovery easier and more enjoyable. It aggregates
                            ratings and reviews from various well-known film
                            databases and review platforms, then provides a
                            concise summary of the general opinion about each
                            movie.
                        </p>
                        <p>
                            All movie data (titles, posters, descriptions, etc.)
                            is sourced from{" "}
                            <a
                                href="https://www.themoviedb.org"
                                target="_blank"
                                className="link"
                            >
                                The Movie Database (TMDB)
                            </a>
                            , in accordance with their terms of use. Ratings and
                            review summaries are collected from publicly
                            available sources and processed to present a unified
                            view.
                        </p>
                    </div>
                    <hr className="divider" />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl text-white font-bold">
                            Credits & Resources
                        </h2>
                        <ul>
                            <li>
                                <strong>Movie data:</strong>{" "}
                                <a
                                    href="https://www.themoviedb.org"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="link"
                                >
                                    The Movie Database (TMDB)
                                </a>
                            </li>
                            <li>
                                <strong>Icons:</strong>
                                <ul className="pl-3">
                                    <li>
                                        Material Design Icons by{" "}
                                        <a
                                            className="link"
                                            href="https://pictogrammers.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Pictogrammers
                                        </a>{" "}
                                        —
                                    </li>
                                    <li>480 Design —</li>
                                    <li>Feather Icons by Megumi Hano —</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <hr className="divider" />
                    <div className="flex flex-col gap-3">
                        <h2 className="text-xl text-white font-bold">Legals</h2>
                        <ul>
                            <li>
                                <a
                                    href="https://docs.google.com/document/d/1kPtMDzq4b4Btc9es2nGkVfmJWuOm6wMzsLvuBovujPY/edit?usp=sharing"
                                    target="_blank"
                                    className="link"
                                >
                                    Terms of Use
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://docs.google.com/document/d/1U9K4JJt03XlQole3SftyZnVFOMwt5yKjd-hspuFoGTU/edit?usp=sharing"
                                    target="_blank"
                                    className="link"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </PageHeader>
            </div>
        </div>
    );
}
