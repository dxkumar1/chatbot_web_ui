import IActionProps from "./IActionProps";
import IMessage from "./IMessage";

export default interface IActionCard extends IMessage{ 
    buttons: IActionProps[];
    actionCardRef?: React.RefObject<HTMLDivElement>;
    active: boolean;
    onClick?:  React.MouseEventHandler;
    setChosen: any;
    txt : any    
}
