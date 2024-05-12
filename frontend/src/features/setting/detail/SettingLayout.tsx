import { useEffect, useState } from "react";
import styles from "styles/Setting.module.css";
import GridLayout from "react-grid-layout";
import { useGettingWidth } from "../layout/LayoutContainer";
import Text from "components/Text";
import DefaultLayoutStyles from "../layout/DefaultLayoutStyles";
import { useSettingActions, useSettingStore } from "stores/settingStore";

// 세부 레이아웃 설정 컴포넌트
const SettingLayout = () => {
  const [userCompLayoutList, userCompList, clickedLayoutIdx, colorList] = useSettingStore((state) => [
    state.userCompLayoutList,
    state.userCompList,
    state.clickedLayoutIdx,
    state.colorList,
  ]);
  const { setClickedLayoutIdxAction, setClickedCompAction } = useSettingActions();
  const [isCust, setIsCust] = useState<boolean>(false);
  const [layoutWidth, layoutContainer] = useGettingWidth();
  const DefaultLayoutList = DefaultLayoutStyles();

  const styleInfo: any = {
    title: { backgroundColor: `${colorList.title.background}`, color: `${colorList.title.text}` },
    page: { backgroundColor: `${colorList.page.background}`, color: `${colorList.page.text}` },
    logo: { backgroundColor: `${colorList.logo.background}`, color: `${colorList.logo.text}` },
    contents: { backgroundColor: `${colorList.contents.background}`, color: `${colorList.contents.text}` },
    category: { backgroundColor: `${colorList.category.background}`, color: `${colorList.category.text}` },
    profile: { backgroundColor: `${colorList.profile.background}`, color: `${colorList.profile.text}` },
  };

  const handleClick = (item: string) => {
    setClickedCompAction(item);
  };

  useEffect(() => {
    DefaultLayoutList[clickedLayoutIdx].id === 0 ? setIsCust(true) : setIsCust(false);
  }, [clickedLayoutIdx]);

  useEffect(() => {
    return () => {
      setClickedLayoutIdxAction(0);
    };
  }, []);

  return (
    <div>
      <div
        ref={layoutContainer}
        style={{
          backgroundColor: "white",
          border: "2px solid #ECECEC",
          // marginLeft: "5px",
          // marginRight: "5px",
          paddingBottom: "30px",
        }}
      >
        <GridLayout
          layout={userCompLayoutList}
          cols={6}
          rowHeight={50}
          width={layoutWidth - 20}
          verticalCompact={isCust}
          preventCollision={!isCust}
          isDraggable={false}
          isResizable={false}
        >
          {userCompList.map((item) => {
            {
              return DefaultLayoutList[clickedLayoutIdx].checkList[item.id] ? (
                <div
                  className={styles.layout_nonColored}
                  style={styleInfo[item.id]}
                  key={item.key}
                  onClick={() => handleClick(item.id)}
                >
                  <div style={{ marginTop: "15px" }}></div>
                  <div className={styles.innerText}>
                    <Text value={item.key} type="caption" color={styleInfo[item.id].text} />
                  </div>
                </div>
              ) : (
                <></>
              );
            }
          })}
        </GridLayout>
      </div>
    </div>
  );
};

export default SettingLayout;
