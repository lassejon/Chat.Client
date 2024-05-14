import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const MainLayout = () => {
    return (
        <>
            <NavBar isLoggedIn={false} />
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default MainLayout