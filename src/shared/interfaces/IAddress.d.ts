import IMessage from "./IMessage";

export default interface IAddress extends IMessage{ 
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zip: string;
    tabIndex?:number;
}
