import React, { ChangeEvent, useEffect } from "react";
import styles from "../Setting.module.css";
import Text from "components/Text";
import MenuIcon from "@mui/icons-material/Menu";
import { editList } from "slices/settingSlice";

interface Props {
  isEdit: editList[];
  item: any;
  newName: string;
  // 함수 타입 뭐로 해야함.?ㅜ
  onChangeEdit: any;
  handleSave: any;
  handleEdit: any;
  handleDele: any;
}

const CategoryLayoutItem = ({ isEdit, item, newName, onChangeEdit, handleSave, handleEdit, handleDele }: Props) => {
  return (
    <div className={styles.gridCategoryItem} key={item.key}>
      {isEdit[item.id] && isEdit[item.id].editable ? (
        <>
          <input
            className={styles.gridCategoryInput}
            value={newName}
            placeholder="카테고리명을 입력하세요."
            onChange={(e) => {
              onChangeEdit(e);
            }}
          />
          <div className={styles.gridCategoryDeleBtn} onClick={() => handleSave(item.id)}>
            <Text value="저장" type="caption" />
          </div>
        </>
      ) : (
        <>
          <MenuIcon fontSize="small" sx={{ p: 1 }} />
          <Text value={item.key} type="caption" />
          <div className={styles.gridCategoryEditBtn} onClick={() => handleEdit(item)}>
            <Text value="수정" type="caption" />
          </div>
          <div className={styles.gridCategoryDeleBtn} onClick={() => handleDele(item.id)}>
            <Text value="삭제" type="caption" />
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryLayoutItem;
