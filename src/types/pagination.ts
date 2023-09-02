export interface IPaginationOptions {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}

export interface IPaginationOptionsResult {
    page: number;
    size: number;
    skip: number;
    sortBy: string;
    sortOrder: 'asc' | 'desc';
}
