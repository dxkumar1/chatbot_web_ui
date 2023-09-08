import React from 'react';
import { MessageListEvent, MessageType } from '../types';


export default interface IMessageListProps {
  className?: string;
  customProps?: {
    [key: string]: unknown;
  };
  onScroll?: React.UIEventHandler;
  onOpen?: MessageListEvent;
  onDownload?: MessageListEvent;
  onPhotoError?: MessageListEvent;
  onMessageFocused?: MessageListEvent;
  onClick?: MessageListEvent;
  handleScroll?:React.MouseEvent<HTMLElement>
}
