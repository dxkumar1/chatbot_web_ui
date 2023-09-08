const { ChatBotClose,Button }=require('@sentaraui/optimahealth_web/dist');

const ModalHeader: React.FC<any> = ({
  title,
  icon = null,
  hideClose = false,
  onClose,
  AgentConnect,
  testIcon,
  callModal,
  modalType = "",
}) => {
  return (
    <>
      {!icon && title && (
        <div
          data-testid="modal_title"
          className={`modal-title ${
            modalType === "sessionTransfer" ? "sessiontransfer" : ""
          }`}
          role="heading"
          aria-level={title}
          tabIndex={2}
        >
          {title}
        </div>
      )}
      {icon && (
        <div
          data-testid="modal_icon"
          className="modalIcon"
          tabIndex={2}
          aria-label={"modal icon"}
        >
          {icon}
        </div>
      )}
      {!hideClose && !AgentConnect && (
        <Button
          data-testid="modal_close"
          tabIndex={2}
          aria-label={"Exit Icon"}
          className="close"
          onClick={onClose}
          role="button"
        >
          {testIcon ? (
            <></>
          ) : !callModal ? (
            <span tabIndex={0} data-testid="call_modal" aria-label={"close modal button"}>
              <ChatBotClose />
            </span>
          ) : (
            <></>
          )}
        </Button>
      )}
    </>
  );
};

export default ModalHeader;
