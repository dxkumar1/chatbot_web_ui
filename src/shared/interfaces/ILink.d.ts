import IMessage from './IMessage';

export default interface ILink extends IMessage { 
    linkRef?: React.RefObject<HTMLAnchorElement>;
    onClick?: React.MouseEventHandler;
    href: string;
    confirmation?:boolean;
    helperText?:string;
    helperTitle?:string;
    testIcon?:React.Component;
    tabIndex?:number;
    chatEnded:boolean;
}
