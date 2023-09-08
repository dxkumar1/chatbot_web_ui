import { ModalDialog, TimeOutModal } from "..";
import React from "react";

import {
  END_CHAT,
  END_CHAT_CONTENT,
  END_CHAT_SUB_CONTENT,
  END_CHAT_BTN_SUBMIT,
  END_CHAT_BTN_CANCEL,
  SERVICE_ERROR_TITLE,
  SERVICE_ERROR_DESCRIPTION,
  SERVICE_ERROR_SUCCESS_TEXT,
  SERVICE_ERROR_FAIL_TEXT,
} from "../../../shared/utils/strings";
const { ChatInfoIcon
 }=require('@sentaraui/optimahealth_web/dist');



function ModalPopupComponent({
  onChatEnd,
  onRetry,
  messageLoading,
  messages = [],
  shouldShowTimeoutMessage,
  timeout,
  onChatEndTimer,
  isRetry,
  modalType,
  isEnded,
  GLOBAL_PHONE_TOLLFREE,
  closeEndSession,
  onContinueSession,
}: any) {
  return (
    <>
      <div className="moda_component" data-testid="modal_error">
        {messages.length === 0 &&
          isRetry &&
          messageLoading &&
          modalType === "error" && (
            <div className="error_popup">
              <ModalDialog
                icon={<ChatInfoIcon />}
                title={SERVICE_ERROR_TITLE}
                content={`${SERVICE_ERROR_DESCRIPTION} ${GLOBAL_PHONE_TOLLFREE}.`}
                successTitle={SERVICE_ERROR_SUCCESS_TEXT}
                cancelTitle={SERVICE_ERROR_FAIL_TEXT}
                onSuccess={onRetry}
                onClose={onChatEnd}
                modalType={"errorpopup"}
              />
            </div>
          )}
        {modalType === "endSessionModal" && (
          <div className="end_session_modal">
            <ModalDialog
              title={END_CHAT}
              content={END_CHAT_CONTENT}
              subContent={END_CHAT_SUB_CONTENT}
              successTitle={END_CHAT_BTN_SUBMIT}
              cancelTitle={END_CHAT_BTN_CANCEL}
              onSuccess={onChatEnd}
              onClose={closeEndSession}
              modalType={"endSessionModal"}
            />
          </div>
        )}
        {shouldShowTimeoutMessage && modalType === "timeout" && isEnded && (
          <TimeOutModal
            onTimeOutCancel={onContinueSession}
            onTimeOutCompletion={onChatEndTimer}
            onEndSession={onChatEnd}
            timeOutCountDown={timeout}
            modalType={modalType}
          />
        )}
      </div>
    </>
  );
}

export default ModalPopupComponent;

