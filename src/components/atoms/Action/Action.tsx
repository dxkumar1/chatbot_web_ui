import React from 'react';
import { useState } from "react";
import { IActionProps } from "../../../shared";
const { Button } = require('@sentaraui/optimahealth_web/dist');

const Action: React.FC<IActionProps> = ({
  onClick,
  title,
  selected,
  keyRef,
  disabled,
  value,
  tabIndex = 0
}) => {
  const [buttonSelected, setbuttonSelected] = useState(selected);

  const onButtonClick = (value: string) => {
    if (disabled === true) {
      return false
    }
    if (disabled === false) {
      if (typeof onClick != undefined && typeof onClick === "function") {
        onClick(value);
      }
      setbuttonSelected(true);
    }
  };
  // Disabled the button after once click
  const disabledButton = () => {
    if (buttonSelected) {
      return "day active btn_disabled primary_btn"
    }
    else if (disabled) {
      return "day btn_disabled primary_btn"
    }
    else {
      return "day primary_btn"
    }
  }

  return (
    <div id="ActionDivId" key={keyRef}>
      <Button
        role="button"
        aria-label={`${title}`}
        data-testid={"button"}
        onClick={() => onButtonClick(value)}
        id={"button"}
        tabIndex={tabIndex + 1}
        value={title}
        className={disabledButton()}
      >
        <span data-testid="myactionbutton">{title}</span>
      </Button>
    </div>
  );
};

export default Action;
