import React from "react";
import { CALL_LIVE_AGENT } from "../../../shared/utils/strings";
import { Input, ReplyButton } from "../../atoms";


interface Chatbot {
    onCall:Function,
    handleChange:Function,
    input:string,
    checkDisable:Function,
    onSend:Function,
    setInput:Function
}
const ChatbotInput = ({
  onCall,
  handleChange,
  input,
  checkDisable,
  onSend,
  setInput
}:Chatbot) => {


  return (
    <>
      <div data-testid="chat-bot-footer-input" className="chat-bot-footer-input redhat_regular">
        <Input
          inputStyle={{
            borderBottom: "1px solid #737373",
            borderColor: "black",
            bottom: "0",
            width: "calc(100% - 70px)",
            height: "30px",
          }}
          data-testid={"inputvalid"}
          className=""
          placeholder="Type a message"
          defaultValue=""
          maxHeight={50}
          onChange={handleChange}
          value={input.trimStart()}
          disabled={checkDisable()}
          onKeyPress={(e: any) => {
            if (e.shiftKey && e.charCode === 13) {
              return true;
            } else if (e.charCode === 13) {
              onSend(input);
              setInput("");
              return true;
            } else if (e.key === " " && input.length === 0) {
              e.preventDefault();
              return true;
            } else {
              return false;
            }
          }}
          rightButtons={
            <ReplyButton
              data-testid={"rebtnvalid"}
              onClick={() => {
                onSend(input);
                setInput("");
              }}
              text="Its for Reply"
              title={input}
              tabIndex={9998}
            />
          }
        />
      </div>
      <div className="chat-bot-footer-inner">
        <button
          className="chat-bot-close-icon"
          data-testid={"close-button"}
          onClick={() => onCall()}
          aria-label={CALL_LIVE_AGENT}
          title={CALL_LIVE_AGENT}
          tabIndex={9999}
        >
          <svg
            width="32"
            height="31"
            viewBox="0 0 32 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden={true}
          >
            <path
              d="M0.5 1.925C0.5 0.861852 1.36185 0 2.425 0H6.56928C7.5103 0 8.31339 0.68032 8.46809 1.60853L9.89126 10.1476C10.0302 10.9812 9.60921 11.8079
  8.85334 12.1858L5.87318 13.6759C8.02205 19.0158 12.2842 23.278 17.6241 25.4268L19.1142 22.4467C19.4921 21.6908 20.3188 21.2698 21.1524 21.4087L29.6915
    22.8319C30.6197 22.9866 31.3 23.7897 31.3 24.7307V28.875C31.3 29.9381 30.4382 30.8 29.375 30.8H25.525C11.7041 30.8 0.5 19.5959 0.5 5.775V1.925Z"
              fill="#0E406A"
            />
          </svg>
        </button>
        <li
          role="link"
          tabIndex={9999}
          aria-label={CALL_LIVE_AGENT}
          onClick={() => onCall()}
          className="chat-footer-inner-online-p"
        >
          {CALL_LIVE_AGENT}
        </li>
      </div>
    </>
  );
};

export default ChatbotInput;
