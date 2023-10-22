// SelectListItem.tsx
export interface SelectListItem {
  Disabled: boolean;
  Group: SelectListGroup | null; // SelectListGroup là một giao diện hoặc lớp khác
  Selected: boolean;
  Text: string;
  Value: string;
}


export interface SelectListGroup {
  Disabled: boolean;
  Name: string;
}



export interface MessageResponse<T> {
  success: boolean;
  code: string;
  httpStatusCode: number;
  title: string;
  message: string;
  data: T;
  totalCount: number;
  isRedirect: boolean;
  redirectUrl: string;
  errors: { [key: string]: string[] };
}


export interface WareHouseDTOs {
  code: string;
  name: string;
  address: string | null;
  description: string | null;
  parentId: string | null;
  path: string | null;
  inactive: boolean;
  wareHouseDTOs: WareHouseDTOs[] | null; // hoặc đổi thành kiểu dữ liệu chính xác
  onDelete: boolean;
  id: string;
}


export interface PageTotalCount<T> {
  pageOfItems: T[];
  totalItemCount: number
}


export interface ParamSearchBase {
  keyWord?: string;
  inActive?: boolean
}