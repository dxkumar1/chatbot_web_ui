import React from "react";
import { AGENT_NUMBER_CALL_TEXT } from '../../../shared/utils/strings';

const ModalFooter: React.FC<any> = ({ onClick, onCancel, successTitle, cancelTitle, hideClose = false,
  AgentConnect, modalType }) => {
  let successbtn = "day active submit"
  let phoneNumber: string = successTitle;
  if (hideClose) {
    successbtn = successbtn.replace("active", "cancel")
  }
  if(modalType ===  "CallAgent") {
    phoneNumber = phoneNumber.replaceAll("+", "").replaceAll("-", "").replaceAll(" ", "");
  }
  return (
    <div className={`footer ${modalType === "sessionTransfer" ? 'sessiontransfer' : '' }`}>
      {/* <button className={`${successbtn}`} onClick={onClick} data-testid="success-btn">{successTitle}</button> */}
      <button
          className={`${successbtn}`}
          onClick={()=> {onClick()}}
          data-testid="success-btn"
          aria-label={`${successTitle}`}
          tabIndex={2}
        >
          <p aria-label={successTitle} tabIndex={2}  className="Contact-btn">
            {modalType ===  "CallAgent" ? (<>
          <svg
          width="22"
          height="21"
          viewBox="0 0 32 31"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M0.5 1.925C0.5 0.861852 1.36185 0 2.425 0H6.56928C7.5103 0 8.31339 0.68032 8.46809 1.60853L9.89126 10.1476C10.0302 10.9812 9.60921 11.8079
              8.85334 12.1858L5.87318 13.6759C8.02205 19.0158 12.2842 23.278 17.6241 25.4268L19.1142 22.4467C19.4921 21.6908 20.3188 21.2698 21.1524 21.4087L29.6915
                22.8319C30.6197 22.9866 31.3 23.7897 31.3 24.7307V28.875C31.3 29.9381 30.4382 30.8 29.375 30.8H25.525C11.7041 30.8 0.5 19.5959 0.5 5.775V1.925Z"
            fill="white"
          />
        </svg>
            <a href={`tel:${phoneNumber}`} target="_parent"> {AGENT_NUMBER_CALL_TEXT} {successTitle}</a></>
            ) : (successTitle)}
          </p>
      </button>
      <button  aria-label={`${cancelTitle}`} tabIndex={2} className="day cancel" onClick={onCancel} data-testid="cancel-btn">{cancelTitle}</button>
    </div>
  )
}

export default ModalFooter

