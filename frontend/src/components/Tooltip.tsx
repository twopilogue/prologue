import styles from "components/css/Tooltip.module.css";
import Text from "components/Text";

interface Props {
  children: string;
}

const Tooltip = ({ children }: Props) => {
  return (
    <div className={styles["container"]}>
      <Text value={children} type="caption" />
    </div>
  );
};

export default Tooltip;
