import "@/styles/global.css";
import Potato from "@/components/Potatoes/Potato";
import { cookies } from "next/headers";

const getData = async () => {
    return cookies().get("jwt-cookie")?.value;
};
export default async function Home() {
    const jwt = await getData();
    return (
        <div>
            <Potato></Potato>
            <h1>And this is the server side wooo</h1>
            <p>{jwt}</p>
        </div>
    );
}
