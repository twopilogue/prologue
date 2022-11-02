import React, { useState } from "react";
import { Layout, Responsive, WidthProvider } from "react-grid-layout";
import GridLayout from "react-grid-layout";
import styles from "./Setting.module.css";

const CategoryLayout = () => {
  const layout: Layout[] = [
    { i: "a", x: 0, y: 0, w: 1, h: 2, static: true },
    { i: "b", x: 0, y: 1, w: 1, h: 2 },
    { i: "c", x: 0, y: 2, w: 1, h: 2 },
  ];

  const addBox = () => {
    <div></div>;
  };

  return (
    <>
      <GridLayout
        className="layout"
        layout={layout}
        cols={1}
        rowHeight={30}
        width={800}
      >
        <div className={styles.box1} key="a">
          a
        </div>
        <div className={styles.box1} key="b">
          b
        </div>
        <div className={styles.box1} key="c">
          c
        </div>
      </GridLayout>
      <button onClick={addBox}>카테고리 추가하기</button>
    </>
  );
};

export default CategoryLayout;
