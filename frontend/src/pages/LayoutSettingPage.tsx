import Text from "components/Text";
import LayoutSample from "features/setting/layout/LayoutSample";
import LayoutSelector from "features/setting/layout/LayoutSelector";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClickedLayoutIdx } from "slices/settingSlice";
import styles from "../features/setting/Setting.module.css";

const LayoutSettingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setClickedLayoutIdx(1));
  }, []);

  return (
    <>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="기본 레이아웃 선택" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="기본으로 사용할 레이아웃을 선택하세요." type="caption" />
      </div>
      <LayoutSelector />
      <LayoutSample />
    </>
  );
};

export default LayoutSettingPage;
