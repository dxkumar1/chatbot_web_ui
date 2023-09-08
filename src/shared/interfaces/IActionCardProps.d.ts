import IActionCard from './IActionCard';
export default interface IActionCardProps extends IActionCard {
    onSelect:(value:string)=>void;
    tabIndex?:number;
    chatEnded?: boolean;
}
