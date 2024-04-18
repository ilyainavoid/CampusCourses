import {createBrowserRouter} from "react-router-dom";
import StartPage from "../pages/StartPage/StartPage.jsx";
import {ROUTES as routes} from "./consts/routes.js";
import HeaderComponent from "../components/Header/Header.jsx";
import LayoutWithHeader from "../components/LayoutWithHeader/LayoutWithHeader.jsx";
import RegistrationPage from "../pages/RegistrationPage/RegistrationPage.jsx";
import AuthorizationPage from "../pages/AuthorizationPage/AuthorizationPage.jsx";
import ProfilePage from "../pages/ProfilePage/ProfilePage.jsx";
import CoursesGroupsPage from "../pages/CoursesGroupsPage/CoursesGroupsPage.jsx";
import GroupCoursesPage from "../pages/GroupCoursesPage/GroupCoursesPage.jsx";
import MyCoursesPage from "../pages/MyCoursesPage/MyCoursesPage.jsx";
import TeachingCoursesPage from "../pages/TeachingCoursesPage/TeachingCoursesPage.jsx";
import CourseDetailsPage from "../pages/CourseDetailsPage/CourseDetailsPage.jsx";

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
    },
    {
        path: routes.groupCourses(),
        element: <LayoutWithHeader><GroupCoursesPage/></LayoutWithHeader>
    },
    {
        path: routes.myCourses(),
        element: <LayoutWithHeader><MyCoursesPage/></LayoutWithHeader>
    },
    {
        path: routes.teachingCourses(),
        element: <LayoutWithHeader><TeachingCoursesPage/></LayoutWithHeader>
    },
    {
        path: routes.courseDetails(),
        element: <LayoutWithHeader><CourseDetailsPage/></LayoutWithHeader>
    }
])