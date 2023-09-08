export default interface IMessageDataStatus {
  autoDownload?: boolean;
  error?: boolean;
  download?: Function | boolean;
  click?: Function | boolean;
  loading?: boolean | number;
}
