import React from 'react';

export default interface IMessageBoxProps {
  onMessageFocused?: any;
  renderAddCmp?: React.Component;
  onClick?: React.MouseEventHandler;
  onOpen?: React.MouseEventHandler;
  onPhotoError?: React.MouseEventHandler;
  onDownload?: React.MouseEventHandler;
  onSelect: Function;
  isAgentConnected?: Boolean;
  
}
