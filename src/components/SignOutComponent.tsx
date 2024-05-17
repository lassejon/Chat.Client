import useSignOut from 'react-auth-kit/hooks/useSignOut';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignOutComponent = ({ classNames, setIsAuthenticated }: { classNames: string, setIsAuthenticated: (arg: boolean) => void }) => {
    const signOut = useSignOut()
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut()
        setIsAuthenticated(false)
        toast.success('You have been signed out')
        navigate('/')
    }

    return (
        <button className={classNames} onClick={handleSignOut}>Sign Out</button>
    )
}

export default SignOutComponent;