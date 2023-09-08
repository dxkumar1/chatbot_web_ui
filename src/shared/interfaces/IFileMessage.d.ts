import IMessage from './IMessage';
import IMessageDataStatus from "./IMessageDataStatus";

export default interface IFileMessage extends IMessage {
  data: {
    name?: string;
    extension?: string;
    size?: string;
    id?: string;
    uri?: string;
    status?: IMessageDataStatus;
  };
}
