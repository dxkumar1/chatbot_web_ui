import React from 'react';
import { MessageType } from './MessageType';

export type MessageListEvent = (item: MessageType, index: number, event: React.MouseEvent<HTMLElement>) => any;
