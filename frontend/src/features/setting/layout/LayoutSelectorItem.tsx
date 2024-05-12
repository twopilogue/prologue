import styles from "styles/Setting.module.css";
import { layoutsConfig } from "./LayoutSelector";
import { Dispatch, SetStateAction } from "react";
import { useSettingActions } from "stores/settingStore";

interface Props {
  index: number;
  layoutList: layoutsConfig[];
  setLayoutList: Dispatch<SetStateAction<layoutsConfig[]>>;
}

const LayoutSelectorItem = ({ index, layoutList, setLayoutList }: Props) => {
  const { setClickedLayoutIdxAction } = useSettingActions();

  const handleClicked = (i: number) => {
    setLayoutList(
      layoutList.map((it: layoutsConfig) => {
        return it.idx === i ? { idx: it.idx, isClicked: true } : { idx: it.idx, isClicked: false };
      }),
    );
    setClickedLayoutIdxAction(index);
  };

  return (
    <div className={styles.layoutItem} onClick={() => handleClicked(index)}>
      {layoutList[index].isClicked ? (
        <div className={styles.layoutItemClicked}>
          <img src={require(`assets/setting/layouts/layout_clicked(${index}).png`)} width={110} height={110} />
        </div>
      ) : (
        <img src={require(`assets/setting/layouts/layout_default(${index}).png`)} width={110} height={110} />
      )}
    </div>
  );
};

export default LayoutSelectorItem;
