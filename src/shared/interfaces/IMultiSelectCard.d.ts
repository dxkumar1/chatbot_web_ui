import ICheckboxProps from "./ICheckboxProps"
import IMessage from "./IMessage";

export default interface IMultiSelectCard extends IMessage { 
    multiSelectCardRef?: React.RefObject<HTMLDivElement>;
    options: ICheckboxProps[]
}
