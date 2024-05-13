import { RouterProvider } from "react-router-dom";
import './styles/App.css'
import {router} from "./utils/router.jsx";

export default function App() {

  return (
      <RouterProvider router={router}/>
  )
}
