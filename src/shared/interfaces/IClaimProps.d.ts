import IClaimData from "./IClaimData";
import IMessage from "./IMessage";

export default interface IClaimProps extends IMessage { 
    data: IClaimData[];
}