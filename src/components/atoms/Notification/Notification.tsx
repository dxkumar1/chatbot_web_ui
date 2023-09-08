import { ILabelProps } from "../../../shared";

const Notification: React.FC<ILabelProps> = ({ text,tabIndex = 0 }) => {
  return (
    <div aria-label={text} tabIndex={tabIndex + 1}  className="notificationtext" data-testid={"notificationdata"}>
      {text}
    </div>
  );
};
export default Notification;
