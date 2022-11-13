import CategoryCntSetting from "features/setting/category/CategoryCntSetting";
import CategoryLayout from "features/setting/category/CategoryLayout";
import React, { useState } from "react";
import { Layout } from "react-grid-layout";
import { KeyConfig } from "slices/settingSlice";

const CategoryPage = () => {
  const [categoryList, setCategoryList] = useState<KeyConfig[]>([]);
  const [layoutList, setLayoutList] = useState<Layout[]>([]);
  const [categoryCnt, setCategoryCnt] = useState<number>(0);
  return (
    <div>
      <CategoryLayout
        categoryList={categoryList}
        layoutList={layoutList}
        categoryCnt={categoryCnt}
        setCategoryList={setCategoryList}
        setLayoutList={setLayoutList}
        setCategoryCnt={setCategoryCnt}
      />
      <CategoryCntSetting />
    </div>
  );
};

export default CategoryPage;
