import IButtonIcon from "./IButtonIcon";

export default interface IButtonProps {
  title?: string;
  text?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  type?: string;
  className?: string;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler;
  icon?: IButtonIcon;
  tabIndex?:number;
}
