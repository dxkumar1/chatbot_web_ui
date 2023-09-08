import { ILabelProps } from "../../../shared";

const Label: React.FC<ILabelProps> = ({ text, tabIndex = 0 }) => {
  return (
    <div role={"contentinfo"} aria-label={text} tabIndex={tabIndex + 1} className="askinput" data-testid={"labeldata"}>
      {text}
    </div>
  );
};
export default Label;
