import { useSelector } from "react-redux";
import { RootState } from "../../../shared/redux/store";
import { IButtonProps } from "../../../shared";
import "./ReplyButton";

const {ReplyButtonIcon} =require('@sentaraui/optimahealth_web/dist');
const ReplyButton: React.FC<IButtonProps> = ({
  buttonRef,
  title,
  disabled,
  onClick,
  tabIndex
}) => {


  const retryReducer = useSelector(
    (state: RootState) => state.reducers.retryReducer
  );

  const checkDisable=()=>{
    return retryReducer.count>=3
    }
  
  return (
    <div>
      <button
        data-testid={'rebtnvalid'}
        className={`${checkDisable()?"btnClassDisabled":"btnClass"}`}
        ref={buttonRef}
        title={title}
        onClick={onClick}
        disabled={disabled ||checkDisable()}
        tabIndex={tabIndex} 
        aria-label={`Reply`} 
      >
        <ReplyButtonIcon/>
      </button>
    </div>
  );
};
export default ReplyButton;
