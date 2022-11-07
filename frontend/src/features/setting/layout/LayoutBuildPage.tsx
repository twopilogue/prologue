import { useAppSelector } from "app/hooks";
import React from "react";
import { selectCheckList } from "slices/settingSlice";
import styles from "./Layout.module.css";

// 1. 위치 전부 세팅
// 2. checkList 필터 -> 생성할지 말지 정하기
const LayoutBuildPage = () => {
  const checkList = useAppSelector(selectCheckList);
  console.log(checkList);
  return (
    <>
      {checkList.logo ? <div className={styles.logo}>Logo</div> : <></>}
      {checkList.profile ? <div className={styles.profile}>Profile</div> : <></>}
      {checkList.category ? <div className={styles.category}>Category</div> : <></>}
      {checkList.page ? <div className={styles.page}>Page</div> : <></>}
      <div className={styles.title}>Title</div>
      <div className={styles.contents}>Contents</div>
    </>
  );
};

export default LayoutBuildPage;
