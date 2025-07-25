const imgIdx = Math.floor(Math.random() * 3) + 1;

export default function HomePage() {
    return (
        <div className="w-full">
            <div className="flex flex-col gap-5 py-5 px-5 md:px-0">
                <section className="w-full h-[40vh] md:h-[60vh] flex flex-col justify-center items-center gap-5">
                    <div className="md:h-60 object-contain">
                        <img
                            className="w-full h-full"
                            src={`assets/images/home/${imgIdx}.png`}
                            alt=""
                        />
                    </div>
                    <div className="flex flex-col justify-start w-96 text-start">
                        <h1 className="text-3xl font-bold">
                            GATHERING RATINGS ACROSS DIFFERENT WEBSITES
                        </h1>
                        <h1 className="text-3xl font-bold text-utils-orange">
                            SO YOU DON'T HAVE TO
                        </h1>
                    </div>
                </section>
                <section className="flex flex-col md:flex-row container mx-auto gap-5 items-center justify-center py-10">
                    <div className="w-full md:w-2/3 flex justify-center">
                        <div className="w-90 md:w-full h-auto object-contain">
                            <img
                                className="w-full h-full"
                                src="assets/images/home/1.png"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full md:w-1/3 px-5 md:px-0 text-center md:text-start">
                        <h1 className="text-3xl font-bold md:max-w-80">
                            GATHERING RATINGS ACROSS DIFFERENT WEBSITES
                        </h1>
                        <h1 className="text-3xl font-bold text-utils-orange">
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
