import IMultiSelectCard from './IMultiSelectCard';
export default interface IMultiSelectCardProps extends IMultiSelectCard {
    onSelect:(value:string)=>void,
    buttons: IActionProps[],
    onChange:(value:string)=>void,
    tabIndex?:number
}
