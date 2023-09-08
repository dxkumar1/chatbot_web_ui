
import React from 'react';

import IMessage from "../../../shared/interfaces/IMessage"; // NOSONAR
import IUser from "../../../shared/interfaces/IUser"; // NOSONAR
import RetryButton from "../RetryButton/RetryButton";

const UserMessage: React.FC<IMessage & IUser> = ({
  text,
  status,
  dateString,
  firstName,
  isRetry=false,
  tabIndex = 0
}) => {
  return (
    <div>
      <div tabIndex={tabIndex + 1} role="contentinfo" className="ActionSelectPara">
        <span role="contentinfo" tabIndex={tabIndex + 1} aria-label={"You"} className="username">You</span>

        <div style={{ paddingTop: "4px" }}>
          <div className={status ? "Actionselect active" : "Actionselect"}>
            <div className="userMessageContent">
              <div className="userMessageIcon"></div>
              <div tabIndex={tabIndex + 1} aria-label={text} role="contentinfo" className="userMessageText" data-testid={"actiondetail"}>
                {text}
              </div>
            </div>
            <div tabIndex={tabIndex + 1} aria-label={dateString} role="contentinfo" className="ActionSelectTime">{dateString}</div>
          </div>
        </div>
        <div tabIndex={tabIndex + 1} aria-label={status} role="contentinfo" className={isRetry?"notDelivered":"delivered"}>{status}</div>
        {isRetry&&<RetryButton tabIndex={tabIndex + 1}/>}
      </div>
    </div>
  );
};

export default UserMessage;
