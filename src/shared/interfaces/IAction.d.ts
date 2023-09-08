export default interface IAction { 
    keyRef?:any
    selected?: boolean;
    title: string;
    type?: string;
    value: string;
    disabled?:boolean;
    onClick?: Function;
}
