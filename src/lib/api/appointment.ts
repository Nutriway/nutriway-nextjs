import { serverFetcher } from "@/lib/fetchers/serverFetcher";

export const getAppointmentById = async (id: string) => {
    try {
        return await serverFetcher({
            url: `/appointments?populate[appointment_payment][populate]=*&populate[nutritionist_availability][populate]=*&populate[client][populate]=*&populate[appointment_result][populate]=*&pagination[pageSize]=2000&filters[id][$eq]=${id}`,
            method: "get"
        });
    } catch (error) {
        console.log("error fetch ", error);
    }
};
