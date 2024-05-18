import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../layouts/MainLayout';

const SignOutComponent = ({ classNames }: { classNames: string }) => {
    const signOut = useSignOut()
    const navigate = useNavigate()
    const state = useContext(AuthContext);

    const handleSignOut = () => {
        signOut()
        state.setIsAuthenticated(false)
        toast.success('You have been signed out')
        navigate('/')
    }

    return (
        <button className={classNames} onClick={handleSignOut}>Sign Out</button>
    )
}

export default SignOutComponent;