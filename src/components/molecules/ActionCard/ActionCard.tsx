import React, { useRef, useState, useEffect } from "react";
import { IActionCardProps, IActionProps } from "../../../shared";
import { Action, Label } from "../../atoms";

const ActionCard = (props: IActionCardProps) => {
  const actionCardRef = useRef(null);

  const [active, setActive] = useState(props.active);

  const [disabled, setDisabled] = useState(false);

  const onActionSelect = (value: string) => {
    props.onSelect(value);
    setActive(false);
    setDisabled(true);
  };
  const { tabIndex = 0} = props;

  useEffect(()=> {
    if(props?.chatEnded) {
      setDisabled(props?.chatEnded);
    }
  },[props?.chatEnded]);
  
  return (
    <div  className="action-card-div">
      {props.text && <Label text={props.text} tabIndex={tabIndex + 1}></Label>}
      <div ref={actionCardRef} className={"action-card"}>
        {props.buttons &&
          props.buttons.map((action: IActionProps, i: number) => (
            <Action
              {...action}
              key={`${props.id}_${i}`}
              keyRef={`${props.id}_${i}`}
              onClick={() =>
                active ? onActionSelect(action.value) : undefined
              }
              selected={action.selected}
              disabled={disabled ? disabled :  action.disabled}
              tabIndex={tabIndex + 1 }
            />
          ))}
      </div>
    </div>
  );
};
export default ActionCard;
