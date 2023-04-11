export type AppointmentPayment = {
    id: number;
    attributes: {
        paymentId: string;
        value: string;
        coinCode: string;
        dateTime: string;
        description: string;
        createdAt: string;
        publishedAt: string;
        updatedAt: string;
        status: string;
    };
};
