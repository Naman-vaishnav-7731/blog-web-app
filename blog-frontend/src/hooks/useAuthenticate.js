import { useSelector } from 'react-redux';

const useAuthenticated = () => {
    const { userInfo, accessToken } = useSelector((state) => state?.auth);
    const isAuthenticated = Boolean(userInfo && accessToken && userInfo?._id);
    return isAuthenticated;
};

export default useAuthenticated;
