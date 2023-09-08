import IMessage from "../../../shared/interfaces/IMessage";

const Confirmation: React.FC<IMessage> = ({ text,tabIndex=0 }) => {
  return (
    <div aria-label={text} tabIndex={tabIndex + 1} role={"contentinfo"}  className="confirmation"  data-testid="confirmation">{text}</div>
  );
};
export default Confirmation;
