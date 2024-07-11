import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

type GameDetails = {
    thumbnail: string;
    title: string;
    genre: string;
    platform: string;
    publisher: string;
    developer: string;
    release_date: string;
    description: string;
    screenshots: { image: string }[];
    // Add other properties as per your API response
};

export default function GamesDetails() {
    const [data, setData] = useState<GameDetails | null>(null);
    const { id } = useParams<{ id: string }>();

    async function getdata(id: string) {
        const options = {
            method: "GET",
            url: "https://free-to-play-games-database.p.rapidapi.com/api/game",
            params: { id: `${id}` },
            headers: {
                "x-rapidapi-key": "da6830c37fmsh9babd3c70129026p1858ecjsnd75deaa24506",
                "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
            },
        };

        try {
            const response = await axios.request(options);
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (id) {
            getdata(id);
        }
    }, [id]);

    return (
        <div className="md:container mx-auto flex font-bold flex-wrap gap-y-5 md:flex-row flex-col px-5">
            <div className="md:w-[50%] p-5">
                <img
                    src={data?.thumbnail}
                    alt=""
                    className="w-full rounded-3xl h-[400px]"
                />
            </div>
            <div className="md:w-[50%] flex flex-col gap-y-5">
                <h1 className="text-white text-4xl">{data?.title}</h1>
                <p className="text-gray-500 flex items-center gap-3">
                    Genre :{" "}
                    <span className="w-fit p-1 bg-orange-500 rounded-lg text-white">
                        {data?.genre}
                    </span>
                </p>
                <p className="text-gray-500 flex items-center gap-3">
                    Platform :{" "}
                    <span className="w-fit p-1 bg-orange-500 rounded-lg text-white">
                        {data?.platform}
                    </span>
                </p>
                <p className="text-gray-500 flex items-center gap-3">
                    Publisher :{" "}
                    <span className="w-fit p-1 bg-orange-500 rounded-lg text-white">
                        {data?.publisher}
                    </span>
                </p>
                <p className="text-gray-500 flex items-center gap-3">
                    Developer :{" "}
                    <span className="w-fit p-1 bg-orange-500 rounded-lg text-white">
                        {data?.developer}
                    </span>
                </p>
                <p className="text-gray-500 flex items-center gap-3">
                    Release Date :{" "}
                    <span className="w-fit p-1 bg-orange-500 rounded-lg text-white">
                        {data?.release_date}
                    </span>
                </p>
                <p className="text-gray-500 flex items-center gap-3">
                    Description : {data?.description}
                </p>
            </div>
            <h2 className="text-white text-3xl">Screenshots:</h2>
            {data?.screenshots?.map((screenshot, index) => (
                <div key={index} className="w-full">
                    <img
                        src={screenshot.image}
                        alt={`Screenshot ${index + 1}`}
                        className="w-full rounded-3xl"
                    />
                </div>
            ))}
        </div>
    );
}
