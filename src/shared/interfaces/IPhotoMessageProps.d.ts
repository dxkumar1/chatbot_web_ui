import React from 'react';
import IPhotoMessage from './IPhotoMessage';

export default interface IPhotoMessageProps extends IPhotoMessage {
  onDownload?: React.MouseEventHandler;
  onOpen?: React.MouseEventHandler;
  onLoad?: React.ReactEventHandler;
  onPhotoError?: React.ReactEventHandler;
  tabIndex?:number;
}
