export default interface ICheckbox { 
    title: string;
    value: string;
    onClick?: Function;
    checked: boolean;
    active: boolean;
    tabIndex?:number
}
