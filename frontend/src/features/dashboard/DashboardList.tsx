import { useEffect, useState } from "react";
import styles from "features/dashboard/Dashboard.module.css";
import Text from "components/Text";
import { Link } from "@mui/material";
import { useAuthStore } from "stores/authStore";
import { getNewPosts } from "apis/api/dashboard";
import { useShallow } from "zustand/react/shallow";
import { useDashboardActions, useDashboardStore } from "stores/dashboardStore";

const DashboardList = () => {
  const [accessToken, githubId] = useAuthStore(useShallow((state) => [state.accessToken, state.githubId]));
  const newPosts = useDashboardStore((state) => state.newPosts);
  const { setNewPostsAction } = useDashboardActions();
  const [newPost, setNewPost] = useState(newPosts);

  const getNewPost = async () => {
    const newPosts = await getNewPosts(accessToken, githubId);
    setNewPostsAction(newPosts);
    setNewPost(newPosts);
  };

  const textLimit = (props: string) => {
    let title = props;
    if (title.length > 30) title = title.substring(0, 30) + " ···";
    return title;
  };

  useEffect(() => {
    getNewPost();
  }, []);

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
};

export default DashboardList;
