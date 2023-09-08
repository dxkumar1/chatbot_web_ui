import React from 'react';

import { CLOSE } from '../../../shared/utils/strings';
const { ChatCloseIcon }=require('@sentaraui/optimahealth_web/dist');


const ModalContent: React.FC<any> = ({ icon, title, content, subContent, hideClose, callModal, onClose,subContentOne, modalType }) => {
  let contentClasses = callModal ?"contentCallAgent":"content";
  let subContentClasses = "sub-content";
  let modalTitleClasses ="modal-subtitle"
  if (hideClose) {
    contentClasses += " " + "timer-content";
    subContentClasses += " " + "timer-subContent";
  }
  if(modalType === 'sessionTransfer') {
    contentClasses +=  " " + 'sessiontransfer';
    subContentClasses +=  " " + 'sessiontransfer';
  }

  if(modalType === 'survey') {
    contentClasses +=  " " + 'survey';
    subContentClasses +=  " " + 'survey';
  }
  if(modalType === 'CallAgent') {
    contentClasses +=  " " + 'CallAgent';
    subContentClasses +=  " " + 'CallAgent';
  }
  if(modalType === 'endSessionModal') {
    contentClasses +=  " " + 'end_session_modal';
    subContentClasses +=  " " + 'end_session_modal';
  }
  if(modalType === 'error') {
    contentClasses +=  " " + 'error_popup';
    subContentClasses +=  " " + 'error_popup';
    modalTitleClasses += " "+'error_popup'
  }
  return (
    <>
      {icon && title && <div aria-label={title} tabIndex={2} data-testid="modal_title" className={modalTitleClasses} >{title}</div>}

      {callModal ? <div data-testid={"call__modal"} style={{ display: "flex", flexDirection: "row" }}>
        <div aria-label={content} tabIndex={2} data-testid="modal_content" role="contentinfo" className={`${contentClasses}`}  dangerouslySetInnerHTML={{ __html: content }}>
        </div>
        
          <div data-testid="modal_close" aria-label={CLOSE} className="close" onKeyDown={onClose} onClick={onClose}>
            <ChatCloseIcon />
          </div>
        
      </div>
        : <div aria-label={content} tabIndex={2} data-testid="modal_content" role="contentinfo" className={`${contentClasses}`}  dangerouslySetInnerHTML={{ __html: content }}>
        </div>}

     {subContent && <div aria-label={subContent} role="contentinfo" tabIndex={2} data-testid="modal_subcontent" className={`${subContentClasses}`}>
        {subContent} 
      </div>}

      {subContentOne &&<div aria-label={subContentOne} role="contentinfo" tabIndex={2} data-testid="modal_subcontent" className={`${subContentClasses}`}>
         {subContentOne}
      </div>}
    </>
  )
}

export default ModalContent

