import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import { useState, createContext } from 'react'

export const AuthenticationContext = createContext({ isAuthenticated: false, setIsAuthenticated: (arg: boolean) => { arg } })

const MainLayout = () => {
    const authenticated = useIsAuthenticated()

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authenticated)

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <NavBar />
            <Outlet />
            <ToastContainer />
        </AuthenticationContext.Provider>
    )
}

export default MainLayout