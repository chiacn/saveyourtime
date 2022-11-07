import React from 'react';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const NotFound = () =>  {
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(() => {navigate("/main")}, 5000)
        }, [navigate])
    return (
    <div>
        Not Found
        {/* <Navigate to="/main" /> */}
    </div>
    )
}
export default NotFound;