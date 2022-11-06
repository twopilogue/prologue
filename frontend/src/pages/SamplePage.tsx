import React from "react";
import { FormControl, FormGroup, RadioGroup, Stack } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Text from "../components/Text";
import Button from "../components/Button";
import Input from "../components/Input";
import SwitchButton from "../components/SwitchButton";
import RadioButton from "../components/RadioButton";
import Tag from "../components/Tag";
import Header from "../components/Header";
import Modal from "components/Modal";
import SideNavigation from "components/SideNavigation";

function SamplePage() {
  const [switchValue, setSwitchValue] = React.useState({
    logo: false,
    profile: false,
    category: false,
  });
  const [radioValue, setRadioValue] = React.useState("color");

  const [oneBtnModalOpen, setOneBtnModalOpen] = React.useState(false);
  const [twoBtnModalOpen, setTwoBtnModalOpen] = React.useState(false);

  const switchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchValue({
      ...switchValue,
      [event.target.name]: event.target.checked,
    });
  };

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
  };

  const showOneBtnModal = () => {
    setOneBtnModalOpen(true);
  };

  const showTwoBtnModal = () => {
    setTwoBtnModalOpen(true);
  };

  const valueCheck = () => {
    console.log(
      "switch 값 : ",
      switchValue.logo,
      switchValue.profile,
      switchValue.category,
    );
    console.log("radio 값 : ", radioValue);
  };

  return (
    <div style={{ backgroundColor: "#F1F8FF" }}>
      <Stack direction="row" spacing={2}>
        <SideNavigation />
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div
            style={{ textAlign: "center", maxWidth: "700px", padding: "20px" }}
          >
            <h3>Text</h3>
            <Stack>
              <Text value="caption 0.875rem 캡션" type="caption" />
              <Text value="text 1rem 본문" type="text" />
              <Text
                value="groupTitle 1.375rem 영역별 타이틀"
                type="groupTitle"
              />
              <Text value="textTitle 1.625rem 본문별 타이틀" type="textTitle" />
              <Text
                value="pageTitle 2.125rem 페이지별 타이틀"
                type="pageTitle"
              />
              <Text value="title 2.625rem 타이틀" type="title" />
            </Stack>
            <hr />
            <h3>Button</h3>
            <Button
              label="Button"
              color="blue"
              icon={<Check />}
              onClick={() => console.log("버튼 클릭함")}
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button />
            <hr />
            <h3>Input</h3>
            <Input name="Input" placeholder="Input테스트" />
            <br />
            <Input onChange={valueCheck} />
            <hr />
            <h3>SwitchButton</h3>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <SwitchButton
                  label="블로그 로고"
                  checked={switchValue.logo}
                  onChange={switchChange}
                  name="logo"
                />
                <SwitchButton
                  label="프로필"
                  checked={switchValue.profile}
                  onChange={switchChange}
                  name="profile"
                />
                <SwitchButton
                  label="카테고리"
                  checked={switchValue.category}
                  onChange={switchChange}
                  name="category"
                />
              </FormGroup>
            </FormControl>
            <hr />
            <h3>RadioButton</h3>
            <FormControl>
              <RadioGroup value={radioValue} onChange={radioChange}>
                <RadioButton label="색상 설정" value="color" />
                <RadioButton label="이미지 설정" value="image" />
              </RadioGroup>
            </FormControl>
            <hr />
            <h3>Tag(Chip)</h3>
            <Tag label="React" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Tag label="Java" />
            <hr />
            <h3>One Button Modal</h3>
            <Button label="Open Modal" onClick={showOneBtnModal} />
            {oneBtnModalOpen && (
              <Modal
                buttonNum={1}
                oneButtonLabel="대시보드로 이동"
                oneButtonSet={() => setOneBtnModalOpen(false)}
                text={`정말 해당 게시글을 삭제하시겠습니까?\n삭제한 게시물은 복구가 불가합니다.`}
              />
            )}
            <hr />
            <h3>Two Button Modal</h3>
            <Button label="Open Modal" onClick={showTwoBtnModal} />
            {twoBtnModalOpen && (
              <Modal
                twoButtonCancle={() => setTwoBtnModalOpen(false)}
                text={`정말 해당 게시글을 삭제하시겠습니까?\n삭제한 게시물은 복구가 불가합니다.`}
              />
            )}
            <hr />
          </div>
        </div>
      </Stack>
    </div>
  );
}

export default SamplePage;
