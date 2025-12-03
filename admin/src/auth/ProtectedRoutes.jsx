import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes() {
    const isLoggedIn = sessionStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() =>{
        if (!isLoggedIn) {
            return navigate("/login")
        }
    }, [])

    return (
        <Outlet />
    )
}

export default ProtectedRoutes