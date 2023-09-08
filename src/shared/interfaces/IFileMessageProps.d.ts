import React from 'react';
import IFileMessage from './IFileMessage';

export default interface IFileMessageProps extends IFileMessage {
  onDownload?: Function;
  onOpen?: React.MouseEventHandler;
  tabIndex?:number;
}
