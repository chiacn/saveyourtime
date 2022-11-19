import React from "react";
import styles from "./header.module.css";

const Navbar = ({ onLogout }) => {
  return (
    <header className={styles.header}>
      {/* onLogout이 있으면 로그아웃 버튼 보이도록 */}
      {onLogout && (
        <button className={styles.logout} onClick={onLogout}>
          Logout
        </button>
      )}
      <h1 className={styles.title}>Card Maker</h1>
    </header>
  );
};

export default Navbar;
