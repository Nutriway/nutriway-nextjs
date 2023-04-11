import { Nutritionist } from "@/types/Nutritionist";

export type Availability = {
    id: number;
    attributes: {
        createdAt: string;
        date: string;
        nutritionist: Nutritionist;
        publishedAt: string;
        updatedAt: string;
    };
};
