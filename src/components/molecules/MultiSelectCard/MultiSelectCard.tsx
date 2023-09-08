import React, { useState } from "react";

import { IMultiSelectCardProps, IActionProps } from "../../../shared";
import { Label, Action } from "../../atoms";
const { Checkbox}=require('@sentaraui/optimahealth_web/dist');


const MultiSelectCard = (props: IMultiSelectCardProps) => {
  const [checked, setChecked] = useState<any>([]);
  const [active, setActive] = useState(props.active);
  const [disabled, setDisabled] = useState(true);

  const onClick = (e: any) => {
    var updatedList = [...checked];
    if (e.target.checked) {
      updatedList = [...checked, e.target.value];
    } else {
      updatedList.splice(checked.indexOf(e.target.value), 1);
    }
    setChecked(updatedList);
    setDisabled(updatedList.length === 0);
  };

  const onActionSelect = () => {
    if (checked.length === 0) {
      setActive(true);
      setDisabled(false);
    } else {
      props.onSelect(checked.join(", ")); // sj 30/11
      setActive(false);
      setDisabled(true);
    }
  };
  const { tabIndex = 0} = props;

  return (
    <div className="multi-select">
      <Label text={props.text} tabIndex={tabIndex + 1}></Label>
      {props.options &&
        props.options.map((x: any, i: number) => (
          <div key={i}>
            <Checkbox
              value={x.value}
              onClick={onClick}
              title={x.title}
              checked={x.checked}
              active={x.active}
              tabIndex={tabIndex + 1}
            />
          </div>
        ))}

      <div role="button"  tabIndex={tabIndex + 1} className="multi_select_btn" id="ActionDivId">
        {props.buttons &&
          props.buttons.map((action: IActionProps, i: number) => (
            <Action
              {...action}
              key={`${props.id}_${i}`}
              keyRef={`${props.id}_${i}`}
              onClick={() => (active ? onActionSelect() : undefined)}
              selected={action.selected}
              disabled={disabled ? disabled : action.disabled}
              tabIndex={tabIndex + 1}
            />
          ))}
      </div>
    </div>
  );
};
export default MultiSelectCard;
