import React, { useState } from "react";
import styles from "./Setting.module.css";
import ButtonStyled from "components/Button";
import palette from "styles/colorPalette";
import { useDispatch } from "react-redux";
import { setCheckList, setComponentLayoutList, selectComponentLayoutList } from "slices/settingSlice";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { Layout } from "react-grid-layout";
import { useAppSelector } from "app/hooks";

interface Props {
  type: string;
  payload: any;
}

interface layoutObjectConfig {
  a: Layout[];
  b: Layout[];
  c: Layout[];
}

// JSON 배열 정렬 함수
export const sortJSON = (data: any) => {
  return data.sort(function (a: any, b: any) {
    const x = a["y"];
    const y = b["y"];
    return x < y ? -1 : x > y ? 1 : 0;
  });
};

const ConfirmButton = ({ type, payload }: Props) => {
  const dispatch = useDispatch();
  const [passComponents, setPassComponent] = useState("");
  const componentLayoutList = useAppSelector(selectComponentLayoutList);

  const handleOnClick = () => {
    // if (type === "blogSetting")
    if (type === "layoutSetting") {
      console.log("체크", payload.checkList);
      console.log("슬라이스 컴포넌트", componentLayoutList);
      dispatch(setCheckList(payload.checkList));

      createDiv();
    }
  };

  // const makeString = () => {};

  const sortLayout = () => {
    const layoutObject: layoutObjectConfig = {
      a: [],
      b: [],
      c: [],
    };
    for (let i = 0; i < componentLayoutList.length; i++) {
      switch (componentLayoutList[i].x) {
        case 0:
          layoutObject.a.push(componentLayoutList[i]);
          break;
        case 1:
          layoutObject.b.push(componentLayoutList[i]);
          break;
        default:
          layoutObject.c.push(componentLayoutList[i]);
      }
    }
    console.log("분류됨", layoutObject);
    const sortedLayoutObject: any = new Object();
    sortedLayoutObject.a = sortJSON(layoutObject.a);
    sortedLayoutObject.b = sortJSON(layoutObject.b);
    sortedLayoutObject.c = sortJSON(layoutObject.c);
    console.log("분류+정렬됨", sortedLayoutObject);
    return sortedLayoutObject;
  };

  const createDiv = () => {
    const divColString = `<div className="display_column">`;
    const divClose = `</div>`;
    let tmpPassComponents = "";

    const sortedLayoutObject = sortLayout();

    for (const idx in sortedLayoutObject) {
      if (sortedLayoutObject[idx].length != 0) {
        console.log(sortedLayoutObject[idx]);

        tmpPassComponents += divColString;
        for (let i = 0; i < sortedLayoutObject[idx].length; i++) {
          console.log(sortedLayoutObject[idx][i].i);
          switch (sortedLayoutObject[idx][i].i) {
            case "블로그 로고":
              tmpPassComponents += "<Logo/>";
              break;
            case "프로필":
              tmpPassComponents += "<Profile/>";
              break;
            case "카테고리":
              tmpPassComponents += "<Category/>";
              break;
            case "페이지":
              tmpPassComponents += "<Page/>";
              break;
            case "타이틀":
              tmpPassComponents += "<Title/>";
              break;
            case "글 목록":
              tmpPassComponents += "<Contents/>";
              break;
          }
        }
        tmpPassComponents += divClose;
      }
    }
    setPassComponent(tmpPassComponents);
    console.log(passComponents);
  };

  return (
    <div className={styles.confirmButton}>
      <div style={{ margin: "10px" }}>
        <ButtonStyled color="sky" label="취소" />
      </div>
      <div style={{ margin: "10px" }}>
        <ButtonStyled label="저장" onClick={handleOnClick} />
      </div>
    </div>
  );
};

export default ConfirmButton;
