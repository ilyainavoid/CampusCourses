import {createBrowserRouter} from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <></>,
        children: [
            {
                path: routes.root(),
                element: <></>
            }
        ]
    }
])