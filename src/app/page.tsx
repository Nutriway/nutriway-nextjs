import "@/styles/global.css";
import Potato from "@/components/Potatoes/Potato";

const getData = async () => {
    //await hello();
};
export default async function Home() {
    await getData();
    return (
        <Potato></Potato>
    );
}
