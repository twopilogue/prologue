import React, { useEffect, useState } from "react";
import styles from "./Setting.module.css";

import { Responsive, WidthProvider, Layout } from "react-grid-layout";
import { useAppSelector } from "app/hooks";
import { KeyConfig, selectComponentLayoutList, selectComponentList } from "slices/settingSlice";
import Text from "components/Text";

const SettingLayout = (props: any) => {
  const ResponsiveGridLayout = WidthProvider(Responsive);

  const [layoutList, setLayoutList] = useState<Layout[]>(useAppSelector(selectComponentLayoutList));
  const [categoryList, setCategoryList] = useState<KeyConfig[]>(useAppSelector(selectComponentList));
  console.log(props.titleColor);
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
      {categoryList.map((item: any, i: number) => {
        return (
          <div key={i}>
            <div className={styles.gridCategoryItem} key={item.key}>
              <Text value={item.key} type="caption" />
            </div>
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
};

export default SettingLayout;
