import React from "react";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import Home from "../../pages/home/home"
import { useAuth } from "../../common/context";
import Button from "../ui/button";
import { login, logout } from "../../service/auth_service";
import User from "../user/user";



const Navbar = () => {
  const user = useAuth().userInfo;

  const navigation = useNavigate();
  const onLogin = () => {
    navigation('/login')
  }

  console.log('Navbar.js / user = ', user)
  return (
    // <header className='flex justify-between border-b border-gray-300 p-2'>
    <header className={styles.header}>
      {/* <Link to='/' className='flex items-center text-4xl text-brand'> */}
      <Link to='/' className={styles.header__link}>
        <h1>UMUL</h1>
      </Link>
      <nav className={styles.header__nav}>
        {/* <Link to='/products'>Products</Link> */}

        {/* {user && (
          <Link to='/carts'>
            <CartStatus />
          </Link>
        )} */}

        {/* {user && user.isAdmin && (
          // <Link to='/products/new' className='text-2xl'>
          <Link to='/products/new' className='header__nav--link'>
            <BsFillPencilFill />
          </Link>
        )} */}
        {/* {user && <User user={user} />} */}


        {/* {
          !user && 
          <button
            className={styles["header__nav--button"]}>
            LOGOUT
          </button>
        } */}


      </nav>
      <div className={styles.header__button}>
        {!user && <Button tailwind={{button:'text-2xl rounded-full mr-4'}} text={'Login'} onClick={onLogin} />}
        {user && <Button tailwind={{button:'text-2xl rounded-full mr-4'}} text={'Logout'} onClick={logout} />}
      </div>

      {/* <User user={user} tailwind={{div: 'flex items-center shrink-0', div__img: 'w-10 h-10 rounded-full mr-2', div__name: 'hidden md:block'}}/> */}
      <User className={styles.header__user} user={user} tailwind={{div: 'flex items-center shrink-0'}}/> 
  </header>
  );
};

export default Navbar;

//     <div className='flex items-center shrink-0'>
//     <img
//       className='w-10 h-10 rounded-full mr-2'
//       src={photoURL}
//       alt={displayName}
//     />
//     <span className='hidden md:block'>{displayName}</span>
//   </div>