import IMessage from "./IMessage";
import IPlanData from "./IPlanData";

export default interface IPlanDataProps extends IMessage { 
    generic: IPlanData[];
    discounted: IPlanData[];
}