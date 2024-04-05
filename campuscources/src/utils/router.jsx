import {createBrowserRouter} from "react-router-dom";
import StartPage from "../pages/StartPage/StartPage.jsx";
import {ROUTES as routes} from "./consts/routes.js";
import HeaderComponent from "../components/Header/Header.jsx";
import LayoutWithHeader from "../components/LayoutWithHeader/LayoutWithHeader.jsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.jsx";
import AuthorizationPage from "../pages/AuthorizationPage/AuthorizationPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import CoursesGroupsPage from "../pages/CoursesGroupsPage/CoursesGroupsPage.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LayoutWithHeader><StartPage/></LayoutWithHeader>
    },
    {
        path: routes.registration(),
        element: <RegistrationPage/>
    },
    {
        path: routes.login(),
        element: <AuthorizationPage/>
    },
    {
        path: routes.profile(),
        element: <LayoutWithHeader><ProfilePage/></LayoutWithHeader>
    },
    {
        path: routes.groups(),
        element: <LayoutWithHeader><CoursesGroupsPage/></LayoutWithHeader>
    }
])