export type StrapiResponse<T> = {
    data: T[];
    meta?: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};

export type SingleStrapiResponse<T> = {
    data: T;
    meta?: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
};
