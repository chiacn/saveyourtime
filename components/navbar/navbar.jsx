import React from "react";
import styles from "./navbar.module.css";
import Link from 'next/link';

const Navbar = () => {
  // const user = useAuth().userInfo;

  return (
    <header className={styles.header}>
      <div className={styles.header__home}>
        <h1>Save Your Time</h1>
      </div>
      <nav className={styles.header__nav}>
        <div className={styles["header__nav--timer"]}>
          <Link href="/home">
						Timer
					</Link>
        </div>
        <div className={styles["header__nav--routine"]}>
          <Link href="/missionList">
						Challenge
					</Link>
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