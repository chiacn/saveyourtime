// import React from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useAuth } from '../common/context';


// const ProtectedRoutes = () => {
//     // 자식컴포넌트들을 감싸고 권한 있으면, Outlet으로 보여줌.
//     console.log('ProtectedRoutes 작동 ================================')
//     console.log('protectedRoutes / userInfo = ', useAuth())

//     const userInfo = useAuth();
//     const location = useLocation();
  
//     return (
//         (userInfo.userInfo !== null) ?  
//         <Outlet/> :
//         <Navigate to="/login" replace={false} state={{from: location}}/> // replace : history에 이력을 남길 것인가 아닌가.
//     )
          

    
// };

// export default ProtectedRoutes;