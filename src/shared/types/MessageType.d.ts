import { 
  IFileMessageProps, 
  IPhotoMessageProps, 
  ITextMessageProps,
  IProgressBarCardProps,
  IActionCardProps,
  IMultiSelectCardProps,
  ILinkProps,
  IClaimProps,
  IAddressProps,
  IMemberProps,
  IPlanDataProps,
  IAlertMessageProps,
  IDeductibleProps,
  IMessage
} from '../interfaces';

export type MessageType = 
  ({ type: 'action' } & IActionCardProps) |
  ({ type: 'prompt' } & IActionCardProps) |
  ({ type: 'photo' } & IPhotoMessageProps) |
  ({ type: 'file' } & IFileMessageProps) |
  ({ type: 'pdf' } & IFileMessageProps) |
  ({ type: 'text' } & ITextMessageProps) |
  ({ type: 'link' } & ILinkProps) |
  ({ type: 'choice' } & IMultiSelectCardProps) |
  ({ type: 'deductibles' } & IDeductibleProps) |
  ({ type: 'claims' } & IClaimProps) |
  ({ type: 'progress' } & IProgressBarCardProps)|
  ({ type: 'address' } & IAddressProps)|
  ({ type: 'member' } & IMemberProps)|
  ({ type: 'memberSecond' } & IMemberProps)|
  ({ type: 'plan' } & IPlanDataProps)|
  ({ type: 'confirmation' } & ITextMessageProps)|
  ({ type: 'alert' } & IAlertMessageProps)|
  ({ type: 'activity' } & ITextMessageProps);
