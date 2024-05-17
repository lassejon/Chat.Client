import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useState } from 'react'

const MainLayout = () => {
    const authenticated = useIsAuthenticated()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticated)

    return (
        <>
            <NavBar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
            <Outlet context={setIsAuthenticated} />
            <ToastContainer />
        </>
    )
}

export default MainLayout