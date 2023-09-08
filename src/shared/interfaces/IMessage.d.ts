
export default interface IMessage {
  id: string;
  messageId: string;
  text: string;
  title: string;
  focus: boolean;
  date: number | Date;
  dateString?: string;
  user: 'system' | 'member' | 'agent' |'memberSecond'
  status: 'delivered' | 'sent' |'Not delivered';
  replyToId?: string;
  replyToIdIndex?: string;
  active?: boolean;
  isRetry?:boolean;
  tabIndex?:number;
}

