import { SetStateAction } from "react";

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
export interface Login {
  username: string;
  password: string;
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


export type TodoContextType = {
  isCreate: boolean;
  setIsCreate: SetStateAction<boolean>;
};

export interface BaseEntity {
  id: string;
}
export interface WareHouse extends BaseEntity {
  code: string;
  name: string;
  address: string;
  description: string;
  parentId: string;
  path: string;
  inactive: boolean;
}


export interface LoginModel {
  username: string;
  password: string;
}



export interface AuthProvider {
  //  isAuthenticated: boolean;
  username: null | string;
  signin(login: Login): Promise<MessageResponse<UserData>|undefined>;
  signout(): Promise<boolean>;
  isAuthenticated(): boolean;
}

export interface UserData {
  jwt: string;
  user: {
    userName: string;
    password: string;
    inActive: boolean;
    role: string;
    roleNumber: number;
    read: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    warehouseId: string;
    listWarehouseId: string;
    onDelete: boolean;
    id: string;
  };
}