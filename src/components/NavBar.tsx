import { NavLink } from 'react-router-dom'
import logo from '../assets/react.svg'
import { useState } from 'react'
import LoggedInUser from '../dtos/responses/LoggedInUser'

const NavBar = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
    const linkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive
            ? 'text-white bg-black hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
    }

    console.log(isLoggedIn)

    const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);

    return (
        <nav className="bg-indigo-700 border-b border-indigo-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div
                        className="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
                    >

                        <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                            <img
                                className="h-10 w-auto"
                                src={logo}
                                alt="React Jobs"
                            />
                            <span className="hidden md:block text-white text-2xl font-bold ml-2"
                            >React Jobs</span
                            >
                        </NavLink>
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">

                                {!isLoggedIn ?
                                    <NavLink to="/login" className={linkClass}>Login</NavLink>
                                    :
                                    <NavLink to="/preferences" className={linkClass}>{loggedInUser?.name}</NavLink>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default NavBar
