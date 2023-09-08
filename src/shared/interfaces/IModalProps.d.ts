export default interface IModalProps {
    title?: string;
    show:boolean;
    isHeaderIcon:boolean;
    content?:string;
    subContent?:string;
    onSuccess?: Function;
    onClose?: Function;
   
  }
  