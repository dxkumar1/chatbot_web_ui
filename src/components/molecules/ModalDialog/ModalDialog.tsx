import React from "react";
import { ModalContent, ModalFooter, ModalHeader } from "../../atoms";
const ModalDialog: React.FC<any> = ({ ...props }) => {
  const {
    icon,
    onClose,
    onSuccess,
    title,
    content,
    subContent,
    successTitle,
    cancelTitle,
    hideClose = false,
    AgentConnect,
    testIcon,
    callModal = false,
    subContentOne,
    modalType,
  } = props;

  let modalBackgroundClasses = "modalBackground";
  let modalContainerClasses = "modal-content modalContainer"

  if (modalType === 'sessionTransfer') {
    modalBackgroundClasses += " " + 'sessiontransfer';
    modalContainerClasses += " " + 'sessiontransfer';
  }
  if (modalType === 'error') {
    modalBackgroundClasses += " " + 'error_popup';
    modalContainerClasses += " " + 'error_popup';
  }
  return (
    <>
      <div
        role="modal"
        tabIndex={2}
        className={modalBackgroundClasses}
       
      >
        <div className="modal fade in">
          <div className="modal-dialog modal-sm">
            <div className={modalContainerClasses}>
              <div className="modal-header"  data-testid="modal-dialog-id">
                  <ModalHeader
                    testIcon={testIcon}
                    callModal={callModal}
                    AgentConnect={AgentConnect}
                    icon={icon}
                    title={title}
                    onClose={onClose}
                    hideClose={hideClose}
                    modalType={modalType}
                  />
                </div>
                <div className="modal-body">
                  <ModalContent
                    callModal={callModal}
                    content={content}
                    icon={icon}
                    title={title}
                    subContent={subContent}
                    subContentOne={subContentOne}
                    onClose={onClose}
                    hideClose={hideClose}
                    modalType={modalType}
                  />
                </div>
              
              {!callModal && (
                  <div data-testid="sessionTransfer" className={`modal-footer ${modalType === "sessionTransfer" ? 'sessiontransfer' : ''}`} >
                    <ModalFooter
                      AgentConnect={AgentConnect}
                      onClick={onSuccess}
                      onCancel={onClose}
                      successTitle={successTitle}
                      cancelTitle={cancelTitle}
                      hideClose={hideClose}
                      modalType={modalType}
                    />
                  </div>
              )}
              </div>
            </div>
          </div>
        </div>
    </>
  );
};

export default ModalDialog;
