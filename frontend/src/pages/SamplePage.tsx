import React from "react";
import Button from "../components/Button";
import Check from "@material-ui/icons/Check";

function SamplePage() {
  return (
    <div className="App">
      <h3>Button &nbsp;&nbsp;&nbsp;&nbsp;</h3>
      <Button
        label="Button"
        color="blue"
        icon={<Check />}
        onClick={() => console.log("클릭함")}
      />
      &nbsp;&nbsp;&nbsp;&nbsp;
      <Button />
      <hr />
    </div>
  );
}

export default SamplePage;
