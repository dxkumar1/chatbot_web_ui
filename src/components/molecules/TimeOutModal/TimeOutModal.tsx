import React, { useEffect, useState } from "react";
import { TIMEOUT_FAIL_TEXT, TIMEOUT_SUCCESS_TEXT } from "../../../shared/utils/strings";

import ModalDialog from "../ModalDialog/ModalDialog";
const { ClockIcon}=require('@sentaraui/optimahealth_web/dist');


const TimeOutModal: React.FC<any> = ({timeOutCountDown, onTimeOutCompletion, onTimeOutCancel, onEndSession, testIcon, modalType}) => {

  const [delay, setDelay] = useState(timeOutCountDown);

  const minutes = Math.floor(delay / 60);
  // 👇️ get the remainder of the seconds
  const seconds = delay % 60;
  const padTo2Digits=(num:any)=> {
    return num.toString().padStart(2, '0');
  }

  useEffect(() => {
    const timerCountdown = setInterval(() => {
      setDelay(delay - 1);
    }, 1000);
    if (delay === 0) {
      clearInterval(timerCountdown);
     onTimeOutCompletion();
    }
    return () => {
      clearInterval(timerCountdown);
    };
  });

  return (
    <div data-testid="modal_data">
        <ModalDialog
          icon={testIcon ? null : <ClockIcon />}
          content="Are you still there?"
          subContent={`${padTo2Digits(minutes)}:${padTo2Digits(seconds)}`}
          successTitle={TIMEOUT_SUCCESS_TEXT}
          cancelTitle={TIMEOUT_FAIL_TEXT}
          onSuccess={onTimeOutCancel}
          onClose={onEndSession}
          hideClose={true}
          modalType ={modalType}
        />
    </div>
  );
};

export default TimeOutModal;
