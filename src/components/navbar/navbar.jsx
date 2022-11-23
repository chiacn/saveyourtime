import React from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import Home from "../../pages/home/home"
import { useAuth } from "../../common/context";
import Button from "../ui/button";
import { login, logout } from "../../service/auth_service";


const Navbar = () => {
  const user = useAuth();
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



      {!user && <Button tailwind='text-2xl' text={'Login'} onClick={login} />}
      {user && <Button tailwind='text-2xl' text={'Logout'} onClick={logout} />}
    </nav>
  </header>
  );
};

export default Navbar;
