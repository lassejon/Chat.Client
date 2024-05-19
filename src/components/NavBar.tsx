import { NavLink } from 'react-router-dom'
import logo from '../assets/temp/message-square-dots-svgrepo-com.svg'
import SignOutComponent from './SignOutComponent';
import AuthenticatedUser from '../dtos/responses/AuthenticatedUser'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { useContext } from 'react';
import { AuthenticationContext } from '../layouts/MainLayout';

const NavBar = () => {
    const authUser = useAuthUser<AuthenticatedUser>()
    const authState = useContext(AuthenticationContext);

    const linkClass = ({ isActive }: { isActive: boolean }): string => {
        return isActive
            ? 'text-white bg-gray-800 hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
    }

    return (
        <nav className="bg-gray-700 border-b border-gray-500">
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
                            <span className="hidden md:block text-white text-2xl font-bold ml-2">Chat</span>
                        </NavLink>
                        <div className="md:ml-auto">
                            <div className="flex space-x-2">

                                {!authState.isAuthenticated ?
                                    <NavLink to={'/login'} className={linkClass}>Login</NavLink>
                                    :
                                    <>
                                        <NavLink to="/preferences" className={linkClass}>{authUser?.firstName}</NavLink>
                                        <SignOutComponent classNames={'bg-red-800 text-white hover:bg-red-900 hover:text-white rounded-md px-3 py-2'} />
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}
export default NavBar
