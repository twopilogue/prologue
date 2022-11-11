import React, { useEffect, useState } from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import { useSelector } from "react-redux";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { Link } from "@mui/material";

function DashboardList() {
  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const [newPost, setNewPost] = useState([]);

  useEffect(() => {
    getNewPost();
  }, []);

  async function getNewPost() {
    await Axios.get(api.dashboard.getNewPost(accessToken, githubId)).then((res) => {
      setNewPost(res.data.currentPosts);
    });
  }

  const textLimit = (props: string) => {
    let title = props;
    if (title.length > 30) title = title.substring(0, 30) + " ···";
    return title;
  };

  return (
    <div className={`${styles.newPostContainer} ${styles.list}`}>
      <div>
        <div>
          <div className={`${styles.flexRow} ${styles.listAll}`}>
            <Text value="최신글 보기" color="blue_5" bold />
            <Text value="전체보기" type="caption" />
          </div>
          {newPost.map((value, index) => (
            <div className={`${styles.flexRow} ${styles.listOne}`} key={index}>
              <Link href={`https://${githubId}.github.io/${value.directory}`} underline="none" color="inherit">
                <Text value={textLimit(value.title)} />
              </Link>
              <Text value={value.date} type="caption" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardList;
