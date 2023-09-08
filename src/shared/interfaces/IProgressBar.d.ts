export default interface IProgressBar {
    name?: string;
    title: string;
    type: string;
    current: string;
    max: string;
    completed: number;
    key?: any;
    tabIndex?:number;

}
