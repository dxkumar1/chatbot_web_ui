export default interface IRadio { 
    name?: string;
    title: string;
    value: string;
    radioRef?: React.RefObject<HTMLInputElement>;
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}
