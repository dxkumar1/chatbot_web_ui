import IMemberData from "./IMemberData";
import IMessage from "./IMessage";

export default interface IMemberProps extends IMessage { 
    data: IMemberData[];
}