import { LoaderFunctionArgs, Route, redirect, useFetcher, useLocation, useRouteLoaderData } from "react-router-dom";
import { isNullOrEmpty, isNullOrUndefined } from "../hepler/StringHelper";
import { AuthProvider, Login, LoginModel, MessageResponse, UserData } from "../model/model";
import Repository from "./HttpHelper";
import { MessageHelper } from "../hepler/MessageHelper";
import { createContext, useContext, useState } from "react";

export const IAuthProvider: AuthProvider = {
    username: null,
    async signin(loginModel: Login): Promise<MessageResponse<UserData>|undefined> {
        const repository = new Repository("http://localhost:50001/api/v1");
        let urlCreate = `/AuthorizeMaster/login`;
        let callapi = await repository.post<MessageResponse<UserData>>(urlCreate, loginModel);
        console.log(callapi)
        if (!isNullOrUndefined(callapi) && !isNullOrUndefined(callapi?.data) && callapi?.success == true) {
            localStorage.setItem('token', callapi?.data.jwt);
            IAuthProvider.username = callapi?.data.user.userName;
            MessageHelper.Success('Đăng nhập thành công !');
            return callapi;
        }
        if (!isNullOrEmpty(callapi?.message))
            MessageHelper.Fails(callapi?.message ?? "Đăng nhập thất bại !");
        return undefined;
    },
    async signout(): Promise<boolean> {
        localStorage.removeItem('token');
        IAuthProvider.username = "";
        return !localStorage.getItem('token');
    },
    isAuthenticated(): boolean {
        // Kiểm tra xem người dùng đã đăng nhập chưa
        return !!localStorage.getItem('token');
    },
};


export function protectedLoader({ request }: LoaderFunctionArgs) {
    // If the user is not logged in and tries to access `/protected`, we redirect
    // them to `/login` with a `from` parameter that allows login to redirect back
    // to this page upon successful authentication
    if (!IAuthProvider.isAuthenticated()) {
        let params = new URLSearchParams();
        params.set("callback", new URL(request.url).pathname);
        return redirect("/auth/login?" + params.toString());
    }
    return null;
}




export const authContext = createContext<boolean>(false);

export function ProvideAuth({ children }: { children: React.ReactNode }): React.JSX.Element {
    const auth = useProvideAuth();
    const currentURL = window.location.pathname;
    if (!auth) {
        let params = new URLSearchParams();
        params.set("callback", currentURL);
        redirect("/auth/login?" + params.toString())
    }
    return (
        <authContext.Provider value={auth.isAuthenticated}>
            {children}
        </authContext.Provider>
    );
}

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {

    const isAuthenticated = IAuthProvider.isAuthenticated();
    return {
        isAuthenticated
    };
}
