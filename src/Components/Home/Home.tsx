import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Game = {
    id: number;
    thumbnail: string;
    title: string;
    genre: string;
    platform: string;
    short_description: string;
    // Add other properties as per your API response
};

export default function Home() {
    const [data, setData] = useState<Game[] | null>(null);

    async function getdata() {
        const options = {
            method: "GET",
            url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
            headers: {
                "x-rapidapi-key": "da6830c37fmsh9babd3c70129026p1858ecjsnd75deaa24506",
                "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setData(response.data.slice(0, 40) as Game[]); // Assuming response.data is an array of Game objects
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <div className="container mx-auto flex md:flex-row flex-col flex-wrap">
            {data?.map((games) => (
                <div className="p-3 md:w-[25%] w-full" key={games.id}>
                    <Link to={`/games-details/${games.id}`}>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 md:h-[450px] cursor-pointer hover:scale-110 transition-all">
                            <img
                                className="rounded-t-lg w-full md:h-[220px]"
                                src={games.thumbnail}
                                alt=""
                            />
                            <div className="p-5">
                                <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white">
                                    {games.title}
                                    <span className="ml-2 text-orange-500">{games.genre}</span>
                                </h5>
                                <span className="text-sky-500 block">{games.platform}</span>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-3">
                                    {games.short_description}
                                </p>
                                <Link
                                    to={`/games-details/${games.id}`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Read more
                                    <svg
                                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M1 5h12m0 0L9 1m4 4L9 9"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </Link>
                </div>
            ))}
        </div>
    );
}
