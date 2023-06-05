import { Client } from './Client';

export type Availability = {
    id: number;
    attributes: {
        createdAt: string;
        date: string;
        nutritionist?: { data: Client };
        publishedAt: string;
        updatedAt: string;
    };
};
