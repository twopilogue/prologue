import React from "react";
import Button from "./Button";
import styles from "./css/header.module.css";

type User = {
  name: string;
};

interface HeaderProps {
  user?: User;
  onLogin?: () => void;
  onLogout?: () => void;
  onCreateAccount?: () => void;
}

const Header = ({ user, onLogin, onLogout, onCreateAccount }: HeaderProps) => (
  <header>
    <div className={styles.wrapper}>
      <div>
        <img
          width="32"
          height="32"
          src="https://user-images.githubusercontent.com/83412032/198398260-5da6df5d-7abd-4228-a9e7-471360e16000.png"
        />
        <h1> Prologue</h1>
      </div>
      <div>
        {user ? (
          <>
            <span className={styles.welcome}>
              Welcome, <b>{user.name}</b>!
            </span>
            <Button onClick={onLogout} label="Log out" />
          </>
        ) : (
          <>
            <Button onClick={onLogin} label="Log in" />
            <Button onClick={onCreateAccount} label="Sign up" />
          </>
        )}
      </div>
    </div>
  </header>
);

export default Header;
