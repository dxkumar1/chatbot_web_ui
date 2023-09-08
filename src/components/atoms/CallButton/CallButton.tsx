import React from 'react';
import { CALL_LIVE_AGENT } from "../../../shared/utils/strings";
import { IButtonProps } from "../../../shared";
const { CallIcon,Button}=require('@sentaraui/optimahealth_web/dist');
const CallButton: React.FC<IButtonProps> = ({
  onClick,
  text,
}) => {
  return (
    <>
      <Button
        onClick={onClick}
        data-testid="callbutton"
        aria-label={CALL_LIVE_AGENT}
        tabIndex={0}
      >
      <CallIcon/>
      </Button>

      <div className="row">
        <p onClick={onClick} aria-label={CALL_LIVE_AGENT}  tabIndex={0} data-testid="paraonclick">
          {CALL_LIVE_AGENT}
        </p>
        <div aria-label={text}  tabIndex={0}>{text}</div>
      </div>
    </>
  );
};
export default CallButton;
