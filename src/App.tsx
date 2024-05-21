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
import ConversationPage from './pages/ConversationPage'
import { SignalRProvider } from './services/signal-r/SignalRContext'

function App() {
  const login = async (loginRequest: Login): Promise<[boolean, AuthenticatedUser]> => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginRequest)
    })

    const data = ((await res.json()) ?? {}) as AuthenticatedUser;

    return [res.ok, data];
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>,
        <Route index element={<HomePage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/login" element={<LoginPage login={login} />} />

        <Route element={<AuthOutlet fallbackPath='/login' />}>
          <Route element={<SignalRProvider />} >
            <Route path="/conversations" element={<ConversationPage />} />
          </Route>
        </Route>
      </Route >
    )
  )
  return (
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}

export default App
