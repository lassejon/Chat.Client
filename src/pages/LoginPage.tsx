import { useState, useContext } from 'react';
import Login from '../dtos/requests/Login';
import AuthenticatedUser from '../dtos/responses/AuthenticatedUser';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import useSignIn from 'react-auth-kit/hooks/useSignIn';
// import { useOutletContext } from "react-router-dom";
import { AuthContext } from '../layouts/MainLayout';

const LoginPage = ({ login }: { login: (loginRequest: Login) => Promise<[boolean, AuthenticatedUser]> }) => {
    const [loginRequest, setLoginRequest] = useState<Login>(new Login());
    const navigate = useNavigate();
    const signIn = useSignIn<AuthenticatedUser>();
    // const setIsAuthenticated = useOutletContext();
    const state = useContext(AuthContext);

    const submitLogin = async (e: React.FormEvent): Promise<void> => {
        e.preventDefault();
        const [authenticated, authenticatedUser] = await login(loginRequest);
        if (!authenticated || !authenticatedUser || !authenticatedUser.token) {
            toast.error('Login failed');
            return;
        }

        console.log(authenticatedUser);

        const authConfig = {
            auth: {
                token: authenticatedUser.token,
                type: 'Bearer',
            },
            userState: authenticatedUser,
        }

        const isSignedIn = signIn(authConfig);

        if (!isSignedIn) {
            toast.error('Login failed');
        } else {
            console.log('login' + state.setIsAuthenticated);
            state.setIsAuthenticated(true);
            toast.success('Login successful');
            navigate('/secure');
        }
    };

    return (
        <section className="bg-indigo-50">
            <div className="container m-auto max-w-2xl py-24">
                <div
                    className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <form onSubmit={submitLogin}>
                        <h2 className="text-3xl text-center font-semibold mb-6">Login</h2>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="mikkel@hansen.dk"
                                required
                                value={loginRequest?.email}
                                onChange={(e) => setLoginRequest({ ...loginRequest, email: e.target.value })}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 font-bold mb-2">Email</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                className="border rounded w-full py-2 px-3 mb-2"
                                placeholder="*********"
                                required
                                value={loginRequest?.password}
                                onChange={(e) => setLoginRequest({ ...loginRequest, password: e.target.value })}
                            />
                        </div>

                        <div>
                            <button
                                className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default LoginPage