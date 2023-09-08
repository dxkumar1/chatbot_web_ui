import IAction from './IAction';
export default interface IActionProps extends IAction {
    onSelect?: Function;   
    tabIndex?:number;
    downloadTranscript?: boolean;
}
