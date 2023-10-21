export interface PaginationOptions {
    pageSizeOptions?: number[];
    initialPageIndex?: number;
    initialPageSize?: number;
    pageIndex?: number;
    pageSize?: number;
};


export const paginationBase: PaginationOptions = {
    initialPageSize: 5,
    pageSizeOptions: [3, 5, 10],
};