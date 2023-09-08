import { ModalDialog, TimeOutModal } from "../../molecules";
import { ILinkProps } from "../../../shared";



import React, { useState } from "react";
import { setSessionAttributes } from "../../../shared/redux/action";
import actionTypes from "../../../shared/types/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../shared/redux/store";
import { useSignalr } from "../../../shared/context/SignalRContext";
import { checkMobileBrowser } from "../../../shared/utils/helpers";
const { ChatWebIcon }=require('@sentaraui/optimahealth_web/dist');


const Link: React.FC<ILinkProps> = ({ linkRef, title, href, text, confirmation, helperText, helperTitle, testIcon, tabIndex = 0 }) => {

  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const sessionReducer = useSelector(
    (state: RootState) => state.reducers.sessionReducer
  );

  const browserType = checkMobileBrowser();

  const closeModal = () => {

    setShowModal(false);
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_MODAL_TYPE,
        ""
      )
    );
  }
  const openLink = () => {
    setShowModal(false);
    if(browserType.indexOf("Device") !== -1) {
      signalrContext.postMessage("pharmacyClaims", {});
    } else if (window) {
      (window as any).open(href, '_blank', 'noreferrer');
    }
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_MODAL_TYPE,
        ""
      )
    );
  }

  const openModal = () => {

    setShowModal(true)
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_MODAL_TYPE,
        "claims"
      )
    );

  }

  if (helperText?.includes("[optimahealth.com/signin]")) {
    let localHelper = helperText.replace("[optimahealth.com/signin]", "");

    const matches = localHelper.substring(localHelper.indexOf('(') + 1, localHelper.indexOf(')'));

    localHelper = localHelper.replace("(", "")
    localHelper = localHelper.replace(")", "")
    helperText = localHelper.replace(matches, `<a class="bubblelink" target="_blank" rel="noreferrer" href='${matches}'>${"optimahealth.com/signin"}</a>`)

  }

  const signalrContext = useSignalr();

  const onContinueSession = () => {
    signalrContext.postMessage("continuesession");
    dispatch(
      setSessionAttributes(
        actionTypes.ActionSetSession.SET_SHOW_TIMEOUT_MODAL,
        false
      )
    );
    signalrContext.clearTimeoutTrigger();
  };
  const onChatEndTimer = () => {
    signalrContext.onChatEndTimer();
  };
  const closeEndSession = () => {
    dispatch(
      setSessionAttributes(actionTypes.ActionSetSession.SET_MODAL_TYPE, "")
    );
  }

  const onChatEnd = () => {
    closeEndSession();
    signalrContext.postMessage("closeEndPopup");
    signalrContext.endSession();
  };

  return (
    <>
      <div className="link-component" data-testid="linktest" tabIndex={tabIndex + 1} role="link" aria-label={text}>
        {!confirmation ? <a
          ref={linkRef}
          title={title}
          tabIndex={tabIndex + 1}
          href={href}
          target={"_blank"}
          rel={"noreferrer"}
        >
          <span>{text}</span>
        </a>
          :
          <>
            <a role="button" data-testid="open_modal" ref={linkRef}
              title={title}
              rel={"noreferrer"}
              tabIndex={tabIndex + 1}
              onClick={openModal}>
              <span>{text}</span>
            </a>
            {showModal && <> <div role="button" tabIndex={tabIndex + 1} className="show_modal" data-testid="show_modal">
              <div className={sessionReducer.shouldShowTimeoutMessage ? "bg_remove" : ""}>
                {sessionReducer.isEnded ? null :
                  <ModalDialog
                    icon={testIcon ? "" : <ChatWebIcon />}
                    testIcon={testIcon}
                    title={helperTitle}
                    content={helperText}
                    successTitle={"Proceed"}
                    cancelTitle={"Cancel"}
                    onSuccess={openLink}
                    onClose={closeModal}
                    modalType={"claims"}
                  />
                }
              </div>
              {sessionReducer.shouldShowTimeoutMessage && sessionReducer.modalType === "claims" &&
                <div className="time_out_claims"><TimeOutModal
                  onTimeOutCancel={onContinueSession}
                  onTimeOutCompletion={onChatEndTimer}
                  onEndSession={onChatEnd}
                  timeOutCountDown={sessionReducer.timeout}
                />
                </div>
              }
            </div>
            </>
            }

          </>}
      </div>
    </>
  );
};
export default Link;
