import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Dashboard from "../layout/Dashboard";
import AddTask from "../pages/Dashboard/AddTask";
import EditTask from "../components/Task/EditTask";
import PrivateRoutes from "./PrivateRoutes";






export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "/",
          element:<Home></Home>,
        },
        {
          path: "register",
          element:<Register></Register>,
        },
        {
          path: "login",
          element:<Login></Login>,
        },
    
      ]
    },
    {
        path: "dashboard",
        element:<PrivateRoutes><Dashboard></Dashboard></PrivateRoutes> ,
        children: [
            {
                path: "addTask",
                element:<AddTask></AddTask>,
              },
              {
                path: 'editTask/:id',
                element:<EditTask></EditTask>,
                loader: ({params})=> fetch(`http://localhost:5000/tasks/${params.id}`)
        
              }
          
        ]
      }
  ]);