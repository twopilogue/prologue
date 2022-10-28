import React from "react";
import Button from "../components/Button";
import Check from "@mui/icons-material/Check";
import Input from "../components/Input";
import Text from "../components/Text";
import SwitchButton from "../components/SwitchButton";
import { FormControl, FormGroup } from "@mui/material";

function SamplePage() {
  const [state, setState] = React.useState({
    logo: false,
    profile: false,
    category: false,
  });

  return (
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
        onClick={() => console.log("클릭함")}
      />
      <Button />
      <hr />
      <h3>Input &nbsp;&nbsp;&nbsp;&nbsp;</h3>
      <Input name="Input" placeholder="Input테스트" />
      <br />
      <Input />
      <hr />
      <h3>SwitchButton &nbsp;&nbsp;&nbsp;&nbsp;</h3>
      <FormControl component="fieldset" variant="standard">
        <FormGroup>
          <SwitchButton
            label="블로그 로고"
            onClick={() => {
              setState({ ...state, logo: !state.logo });
            }}
          />
          <SwitchButton label="프로필" />
          <SwitchButton label="카테고리" />
        </FormGroup>
      </FormControl>
    </div>
  );
}

export default SamplePage;
