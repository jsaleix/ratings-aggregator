export default function HomePage() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-5 py-5">
                <section className="flex flex-col md:flex-row container mx-auto gap-5 items-center justify-center py-10">
                    <div className="w-full md:w-1/3 flex justify-center">IMAGE HERE</div>
                    <div className="flex flex-col w-full md:w-1/3 px-5 md:px-0 text-center md:text-start">
                        <h1 className="text-3xl font-bold md:max-w-80">
                            GATHERING RATINGS ACROSS DIFFERENT WEBSITES
                        </h1>
                        <h1 className="text-3xl font-bold text-utils-green">
                            SO YOU DON'T HAVE TO
                        </h1>
                    </div>
                </section>

                <section className="bg-bg-light flex justify-center py-5">
                    <h2 className="text-black text-xl">
                        Gathering ratings from
                    </h2>
                </section>
            </div>
        </div>
    );
}
