import React from "react"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AdminSidebar } from "../layouts/AdminSidebar"

const MainRouter = ({children})=>{

    const routesData = createBrowserRouter([
        {
            path:"/",
            element:<h1>LOGIN</h1>,
            errorElement:<h1>ERROR...</h1>
        },
        {
            path:"/admin",
            element:<AdminSidebar/>,
            errorElement:<h1>ERROR...</h1>,
            children:[
                {
                    path:"adddrone",
                    element:<h1>Add Drone</h1>
                },
                {
                    path:"viewdrones",
                    element:<h1>VIEW DRONES.</h1>
                }
            ]

        }
    ])

    return(
        <React.Fragment>
            <RouterProvider router={routesData}>{children}</RouterProvider>
        </React.Fragment>
    )

}
export default MainRouter