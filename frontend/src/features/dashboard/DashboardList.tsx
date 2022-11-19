import React, { useEffect, useState } from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import { useDispatch, useSelector } from "react-redux";
import { dashboardActions } from "slices/dashboardSlice";
import { rootState } from "app/store";
import api from "api/Api";
import Axios from "api/JsonAxios";
import { Link } from "@mui/material";

function DashboardList() {
  const dispatch = useDispatch();

  const { accessToken, githubId } = useSelector((state: rootState) => state.auth);
  const { newPosts } = useSelector((state: rootState) => state.dashboard);

  const [newPost, setNewPost] = useState(newPosts);

  useEffect(() => {
    Axios.get(api.dashboard.getNewPost(accessToken, githubId)).then((res) => {
      dispatch(
        dashboardActions.newPosts({
          newPosts: res.data.currentPosts,
        }),
      );
      setNewPost(res.data.currentPosts);
    });
  }, []);

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
            <Link href={`https://${githubId}.github.io/blog`} underline="none" color="inherit" target="_blank">
              <Text value="전체보기" type="caption" />
            </Link>
          </div>
          {newPost.map((value, index) => (
            <div className={`${styles.flexRow} ${styles.listOne}`} key={index}>
              <Link
                href={`https://${githubId}.github.io/blog/${value.directory}`}
                underline="none"
                color="inherit"
                target="_blank"
              >
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
