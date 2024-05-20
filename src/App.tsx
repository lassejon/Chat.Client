import './App.css'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import Login from './dtos/requests/Login'
import AuthenticatedUser from './dtos/responses/AuthenticatedUser'
import AuthProvider from 'react-auth-kit';
import store from './services/authentication/AuthenticationStore';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'
import ChatBox from './components/ChatBox'

function App() {
  const login = async (loginRequest: Login): Promise<[boolean, AuthenticatedUser]> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest)
    })
    // console.log('res');
    // console.log(res);

    // console.log('loginRequest');
    // console.log(loginRequest);
    // const res = await fetch('http://localhost:44330/login', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })

    const data = ((await res.json()) ?? {}) as AuthenticatedUser;

    return [res.ok, data];
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>,
        <Route index element={<HomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route path="/secure" element={<div>very secret sauce</div>} />
        </Route>
      </Route>
    )
  )
  return (
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
