import PrimarySearchAppBar from "../HomePage/HomePage"
import { Outlet, NavLink, useLocation } from "react-router-dom"

export default function Layout() {

    const currLocation = useLocation()
    console.log('Layout:', currLocation)

    return (
        <> 
        <PrimarySearchAppBar/>
        <Outlet />
        </>
       
    )
}