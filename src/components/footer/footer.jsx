import React from "react";
import { useAuth } from "../../common/context";
import styles from "./footer.module.css";

const Footer = (props) => {

  return (
    <footer className={styles.footer}>
      <p className={styles.title}>Login Page</p>
    </footer>
  );
};

export default Footer;
