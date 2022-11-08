import React, { useEffect } from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";

function DashboardList() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);

  useEffect(() => {
    getNewPost();
  }, []);

  async function getNewPost() {
    await Axios.get(api.dashboard.getNewPost(accessToken, githubId))
      .then((res) => {
        console.log("최신글 받기", res.data);
      })
      .catch((err) => [console.error("최신글 받기", err)]);
  }

  const list = [
    {
      title: "[백준] 2525번 : 오븐 시계 - [C++]",
      date: "2022.12.13",
    },
    {
      title: "아이패드 10세대, 아이패드 프로 6세대, 애플 TV 4K 3세대 공개",
      date: "2022.12.11",
    },
    {
      title: "3D 프린터로 하루만에 집 짓기 (Apis Cor)",
      date: "2022.11.21",
    },
    {
      title: "객체 지향 4가지 특징과 5가지 원칙",
      date: "2022.11.10",
    },
    {
      title: "[일상] 크리스마스 준비, 트리만들기",
      date: "2022.11.05",
    },
    {
      title: "[JavaScript] 문자열 자르기 (substr, substring, slice)",
      date: "2022.10.05",
    },
  ];

  const textLimit = (props: string) => {
    let title = props;
    if (title.length > 30) title = title.substring(0, 30) + " ···";
    return title;
  };

  return (
    <div className={`${styles.container} ${styles.list}`}>
      <div>
        <div>
          <div className={`${styles.flexRow} ${styles.listAll}`}>
            <Text value="최신글 보기" color="blue_5" bold />
            <Text value="전체보기" type="caption" />
          </div>
          {list.map((value, index) => (
            <div className={`${styles.flexRow} ${styles.listOne}`} key={index}>
              <Text value={textLimit(value.title)} />
              <Text value={value.date} type="caption" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardList;
