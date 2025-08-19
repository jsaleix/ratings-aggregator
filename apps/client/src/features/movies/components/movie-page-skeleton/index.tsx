export default function MoviePageSkeleton() {
    return (
        <div className="w-full max-w-screen">
            <div className="flex flex-col items-center container mx-auto gap-5 pb-5 md:py-5 animate-pulse">
                <header className="flex flex-col w-full md:flex-row gap-5 justify-center">
                    
                    <div className="hidden md:flex h-auto md:w-75 overflow-hidden aspect-[9/16] bg-gray-200"></div>
                    
                    <div className="md:hidden h-70 bg-gray-200"></div>
                    
                    <div className="flex flex-col gap-6 px-5 md:px-0 md:w-1/4">
                        <div className="h-8 bg-gray-200 rounded w-2/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-16 bg-gray-200 rounded w-full"></div>
                        <div className="flex flex-col gap-2">
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                </header>
                <hr className="w-full border-bg-light" />
                <div className="flex flex-col gap-3 w-full md:px-0 px-5">
                    <div className="w-full flex justify-between">
                        <div className="h-6 bg-gray-200 rounded w-1/7"></div>
                    </div>
                    <div className="flex flex-col">
                        <ul className="flex flex-col md:w-[100%]">
                            <li className="h-16 bg-gray-200 rounded"></li>
                            <li className="h-16 bg-gray-200 rounded my-3"></li>
                        </ul>
                    </div>
                    {/* <div className="w-full xl:w-1/3 h-fit bg-gray-200 p-5 rounded-xl shadow-md flex flex-col gap-1">
                        <div className="h-4 bg-grayer-200 rounded w-1/3"></div>
                        <div className="h-4 bg-grayer-200 rounded w-3/4 my-2"></div>
                        <div className="h-3 bg-grayer-200 rounded w-1/2"></div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
