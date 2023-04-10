import "@/styles/global.css";
import Potato from "@/components/Potatoes/Potato";
import { cookies } from "next/headers";
import { serverFetcher } from "@/lib/fetchers/serverFetcher";

const getData = async (id: number) => {
    const data = await serverFetcher({
        url: `/appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${id}`,
        method: "get"
    });
    console.log(data);
    return cookies().get("jwt-cookie")?.value;
};

const content = {
    title: "This is a server component"
};

export default async function Home() {
    // Start using URL parameters for stuff like pagination
    const jwt = await getData(1);
    return (
        <div>
            <Potato></Potato>
            <h1>{content.title}</h1>
            <p>{jwt}</p>
        </div>
    );
}
