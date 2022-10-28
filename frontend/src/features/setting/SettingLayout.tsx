import React from "react";
import styles from "./Setting.module.css";

const SettingLayout = () => {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.box1}>1</div>
        <div className={styles.box2}>2</div>
        <div className={styles.box3}>3</div>
      </div>
      <div className={styles.container}>
        <div className={styles.box4}>4</div>
        <div className={styles.box5}>5</div>
        <div className={styles.box6}>6</div>
      </div>
    </div>
  );
};

export default SettingLayout;
