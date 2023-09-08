import IMessage from "./IMessage";
import IProgressBarProps from "./IProgressBarProps";
export default interface IProgressBarCard extends IMessage{ 
    items: IProgressBarProps[];
}
