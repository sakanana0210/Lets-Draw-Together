import { useSelector } from 'react-redux';

export const useAuth = () => {
    const authenticated = useSelector((state) => state.auth.isAuthenticated);
    const userUid = useSelector((state) => state.auth.loginUserUid);
    const userName = useSelector((state) => state.auth.loginUserName);
    return { authenticated, userUid, userName };
};