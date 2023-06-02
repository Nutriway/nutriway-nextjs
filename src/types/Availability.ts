import { Client } from './Client';

export type Availability = {
    id: number;
    attributes: {
        createdAt: string;
        date: string;
        nutritionist?: Client;
        publishedAt: string;
        updatedAt: string;
    };
};
