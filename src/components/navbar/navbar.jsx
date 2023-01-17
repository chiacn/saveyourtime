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
      {/* <Link to='/' className={styles.header__home}> */}
      <div className={styles.header__home}>
        <h1>Save Your Time</h1>
        {/* <h1>Time Saver</h1> */}
      </div>
      {/* </Link> */}
      <nav className={styles.header__nav}>
        <div className={styles["header__nav--timer"]}>
          <Link to='/'>Timer</Link>
        </div>
        <div className={styles["header__nav--routine"]}>
          <Link to='/routine'>Routine</Link>
        </div>

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
        
      {/* <User user={user} tailwind={{div: 'flex items-center shrink-0', div__img: 'w-10 h-10 rounded-full mr-2', div__name: 'hidden md:block'}}/> */}
      {/* <div className={styles['header__user-ui']}>
        <div className={styles.header__user}>
          {user && <User user={user} tailwind={{div: 'flex items-center shrink-0'}}/> }
        </div>
        
        <div className={styles.header__button}>
          {!user && <Button tailwind={{button:'text-2xl rounded-full mr-4'}} text={'Login'} onClick={onLogin} />}
          {user && <Button tailwind={{button:'text-2xl rounded-full mr-4'}} text={'Logout'} onClick={logout} />}
        </div>
      </div> */}
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