import { IButtonProps } from "../../../shared";
import ConnectingAgentText from "../../atoms/ConnectingAgentText/ConnectingAgentText";
const CancelAgentButton: React.FC<IButtonProps> = ({
  buttonRef,
  title,
  disabled,
  onClick,
  text,
  tabIndex
}) => {// 12/8/22
  return (
    <>
      <ConnectingAgentText />
      <div className="cancel_agent_button">
      <button
        title={title}
        disabled={disabled}
        onClick={onClick}
        data-testid="btn_cancel"
        className={"CancelAgentButtonClass redhat_medium"}
        tabIndex={tabIndex}
        role="button"
        aria-label={text}
      >
        <span>{text}</span>
      </button>
      </div>
    </>
  );
};
export default CancelAgentButton;
