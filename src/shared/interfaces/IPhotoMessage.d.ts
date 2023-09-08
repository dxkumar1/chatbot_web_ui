import IMessage from './IMessage';
import IMessageDataStatus from "./IMessageDataStatus";

export default interface IPhotoMessage extends IMessage {
  name?: string;
  uri: string;
  width?: number;
  height?: number;
  extension?: string;
  size?: number;
  alt: string;
}
