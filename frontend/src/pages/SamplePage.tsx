import React from "react";
import { FormControl, FormGroup, RadioGroup } from "@mui/material";
import Check from "@mui/icons-material/Check";
import Text from "../components/Text";
import Button from "../components/Button";
import Input from "../components/Input";
import SwitchButton from "../components/SwitchButton";
import SwitchButtonTest from "../components/SwitchButtonTest";
import RadioButton from "../components/RadioButton";
import Tag from "../components/Tag";
import Header from "../components/Header";

function SamplePage() {
  const [switchValue, setSwitchValue] = React.useState({
    logo: false,
    profile: false,
    category: false,
  });
  const [radioValue, setRadioValue] = React.useState("color");

  const switchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSwitchValue({
      ...switchValue,
      [event.target.name]: event.target.checked,
    });
  };

  const radioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue((event.target as HTMLInputElement).value);
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
    <div>
      <Header />
      <div style={{ textAlign: "center", maxWidth: "500px", margin: "20px" }}>
        <h3>Text &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <Text name="Hello" color="red" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Text />
        <hr />
        <h3>Button &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <Button
          label="Button"
          color="blue"
          icon={<Check />}
          onClick={() => console.log("버튼 클릭함")}
        />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button />
        <hr />
        <h3>Input &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <Input name="Input" placeholder="Input테스트" />
        <br />
        <Input onChange={valueCheck} />
        <hr />
        <h3>SwitchButton1 &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <SwitchButton
              label="블로그 로고"
              onClick={() => {
                setSwitchValue({ ...switchValue, logo: !switchValue.logo });
              }}
            />
            <SwitchButton label="프로필" />
            <SwitchButton label="카테고리" />
          </FormGroup>
        </FormControl>
        <hr />
        <h3>SwitchButton2 &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <FormControl component="fieldset" variant="standard">
          <FormGroup>
            <SwitchButtonTest
              label="블로그 로고"
              checked={switchValue.logo}
              onChange={switchChange}
              name="logo"
            />
            <SwitchButtonTest
              label="프로필"
              checked={switchValue.profile}
              onChange={switchChange}
              name="profile"
            />
            <SwitchButtonTest
              label="카테고리"
              checked={switchValue.category}
              onChange={switchChange}
              name="category"
            />
          </FormGroup>
        </FormControl>
        <hr />
        <h3>RadioButton &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <FormControl>
          <RadioGroup value={radioValue} onChange={radioChange}>
            <RadioButton label="색상 설정" value="color" />
            <RadioButton label="이미지 설정" value="image" />
          </RadioGroup>
        </FormControl>
        <hr />
        <h3>Tag(Chip)&nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <Tag label="React" />
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Tag label="Java" />
        <hr />
        <h3>Select &nbsp;&nbsp;&nbsp;&nbsp;</h3>
        <hr />
        <h3>Modal &nbsp;&nbsp;&nbsp;&nbsp;</h3>
      </div>
    </div>
  );
}

export default SamplePage;
