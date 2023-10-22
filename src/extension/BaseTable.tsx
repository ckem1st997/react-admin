export interface PaginationOptions {
    pageSizeOptions?: number[];
    initialPageIndex?: number;
    initialPageSize?: number;
    pageIndex: number;
    pageSize: number;
    totalItemCount?: number
};


export const paginationBase: PaginationOptions = {
    initialPageSize: 5,
    pageSizeOptions: [3, 5, 10],
    pageIndex: 0,
    pageSize: 5,
    totalItemCount:10
};