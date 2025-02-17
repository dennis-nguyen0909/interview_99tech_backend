import { ComponentType } from "react";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import HomePage from "../pages/HomePage";

interface IRoute {
    path: string;
    page: ComponentType;
    isShowHeader?: boolean;
    isPrivate?: boolean;
    isShowFooter?:boolean;
}

export const routes: IRoute[] = [
    {
        path: '/login',
        page: LoginPage,
        isShowHeader: false,
        isPrivate:false,
    },
    {
        path: '/register',
        page: RegisterPage,
        isShowHeader: false,
        isPrivate:false,
    },
    {
        path: '/',
        page: HomePage,
        isShowHeader: false,
        isPrivate:false,
    },
];