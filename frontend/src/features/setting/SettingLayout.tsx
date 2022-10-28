import React, { useEffect, useState } from "react";
import styles from "./Setting.module.css";

import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import { selectLayoutList } from "slices/settingSlice";

const SettingLayout = () => {
  const ResponsiveGridLayout = WidthProvider(Responsive);
  const savedLayoutList: Layout[] = useAppSelector(selectLayoutList);
  const [layoutList, setLayoutList] = useState<Layout[]>(savedLayoutList);

  useEffect(() => {
    const tmpLayoutList: Layout[] = [];
    const layoutLength = layoutList.length;
    for (let i = 0; i < layoutLength; i++) {
      console.log(layoutList[i]);
      tmpLayoutList.push({
        ...layoutList[i],
        static: true,
      });
    }
    console.log(tmpLayoutList);
    setLayoutList(tmpLayoutList);
  }, []);

  return (
    <ResponsiveGridLayout
      layouts={{ lg: layoutList }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }}
      rowHeight={30}
      width={1000}
    >
      <div className={styles.box1} key="a">
        Category
      </div>
      <div className={styles.box2} key="b">
        Main
      </div>
      <div className={styles.box3} key="c">
        Contents
      </div>
    </ResponsiveGridLayout>
  );
};

export default SettingLayout;
