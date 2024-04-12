import { ChangeEvent } from "react";
import Text from "components/Text";
import styles from "../Setting.module.css";
import { PageConfig, editList } from "slices/settingSlice";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  item: PageConfig;
  isEdit: editList[];
  newName: string;
  onChangeEdit: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSave: (item: PageConfig) => void;
  handleEdit: (item: PageConfig) => void;
  handleDele: (item: PageConfig) => void;
}

const PageLayoutItem = ({ item, isEdit, newName, onChangeEdit, handleSave, handleEdit, handleDele }: Props) => {
  return (
    <div className={styles.gridCategoryItem} key={item.label}>
      {isEdit[item.id] && isEdit[item.id].editable ? (
        <>
          <input
            className={styles.gridCategoryInput}
            value={newName}
            placeholder="페이지명을 입력하세요."
            onChange={(e) => {
              onChangeEdit(e);
            }}
          />
          <div className={styles.gridCategoryDeleBtn} onClick={() => handleSave(item)}>
            <Text value="저장" type="caption" />
          </div>
        </>
      ) : (
        <>
          <MenuIcon fontSize="small" sx={{ p: 1 }} />
          <Text value={item.label} type="caption" />
          {item.label === "posts" || item.label === "Posts" ? (
            <></>
          ) : (
            <>
              <div className={styles.gridCategoryEditBtn} onClick={() => handleEdit(item)}>
                <Text value="수정" type="caption" />
              </div>
              <div className={styles.gridCategoryDeleBtn} onClick={() => handleDele(item)}>
                <Text value="삭제" type="caption" />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PageLayoutItem;
