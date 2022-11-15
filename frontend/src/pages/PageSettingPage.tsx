import React, { useEffect, useState } from "react";
import styles from "features/setting/Setting.module.css";
import Text from "components/Text";
import PageLayout from "features/setting/page/PageLayout";
import Axios from "api/JsonAxios";
import api from "api/Api";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import { PageConfig, editList, selectPageDeleList, setPageDeleList } from "slices/settingSlice";
import ButtonStyled from "components/Button";
import { Layout } from "react-grid-layout";

interface resultConfig {
  label: string;
  posts: boolean;
  type: string;
  oldName?: string;
}

const PageSettingPage = () => {
  const { githubId, accessToken } = useSelector((state: rootState) => state.auth);
  const [pageList, setPageList] = useState<PageConfig[]>([]);
  const [layoutList, setLayoutList] = useState<Layout[]>([]);
  const [pageCnt, setPageCnt] = useState<number>(0);
  const [isEdit, setIsEdit] = useState<editList[]>([]);
  const [deleList, setDeleList] = useState<PageConfig[]>([]);

  const getPage = async () => {
    await Axios.get(api.setting.getPage(accessToken, githubId))
      .then((res: any) => {
        const result = res.data.pages;
        const tmpPageList: PageConfig[] = [];
        const tmpIsEdit: editList[] = [];
        let i = 0;
        result.map((it: any) => {
          tmpPageList.push({ label: it.label, posts: it.posts, id: i, type: "unchanging" });
          tmpIsEdit.push({ key: it.label, id: i, editable: false });
          setPageCnt(result.length);
          i++;
        });
        setPageList(tmpPageList);
        setIsEdit(tmpIsEdit);
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

  const savePageList = () => {
    // 페이지리스트 + 삭제리스트
    const pageResult: PageConfig[] = pageList.concat(deleList);

    // 병합
    const map = new Map();
    layoutList.forEach((item) => map.set(parseInt(item.i), item));
    pageResult.forEach((item) => map.set(item.id, { ...map.get(item.id), ...item }));
    const merged = Array.from(map.values());

    // 정렬
    const sorted = merged.sort((a, b) => a.y - b.y);
    const result: resultConfig[] = [];
    sorted.map((item) =>
      item.oldName
        ? result.push({ label: item.label, posts: item.posts, type: item.type, oldName: item.oldName })
        : result.push({ label: item.label, posts: item.posts, type: item.type }),
    );
    sendPage(result);
  };

  const sendPage = async (result: resultConfig[]) => {
    await Axios.put(api.setting.modifyPage(), { accessToken: accessToken, githubId: githubId, pages: result })
      .then((res: any) => {
        console.log("됨? ", res);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPage();
  }, []);

  return (
    <div>
      <div className={styles.textPadding} style={{ paddingTop: "0", paddingBottom: "10px" }}>
        <Text value="페이지 설정" type="groupTitle" bold />
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <Text value="드래그 앤 드롭으로 페이지 순서를 변경할 수 있습니다." type="caption" />
      </div>
      <PageLayout
        pageList={pageList}
        layoutList={layoutList}
        pageCnt={pageCnt}
        deleList={deleList}
        isEdit={isEdit}
        setPageList={setPageList}
        setLayoutList={setLayoutList}
        setPageCnt={setPageCnt}
        setDeleList={setDeleList}
        setIsEdit={setIsEdit}
      />
      <div className={styles.confirmButton}>
        <div style={{ margin: "10px" }}>
          <ButtonStyled color="sky" label="취소" />
        </div>
        <div style={{ margin: "10px" }}>
          <ButtonStyled label="저장" onClick={savePageList} />
        </div>
      </div>
    </div>
  );
};

export default PageSettingPage;
