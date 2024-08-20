import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = () => {
    const { userInfo } = useSelector((state) => state?.auth);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/auth/login');
        }
    }, [userInfo, navigate]);

    return userInfo ? <Outlet /> : null;
};

export default ProtectedRoute;
