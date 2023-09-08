import React from "react";

import {
  UserMessage,
  Confirmation,
  Notification,
} from "../../atoms";
import {
  PhotoMessage,
  ActionCard,
  MultiSelectCard,
  FileMessage,
} from "../../molecules";
import { MessageBoxType } from "../../../shared";
import MessageBoxComponent from "./component/MessageBoxComponent";
const { Address,ChatBubbleSecond,ChatBubble }=require('@sentaraui/optimahealth_web/dist');
const MessageBox: React.FC<MessageBoxType> = ({ ...props }) => {
  const onSelect = (value: string) => {
    props.onSelect(value);
  };
  return (
    <div className="message" data-testid={"message-listid"}>
      {props.type === "text" &&
        props.user !== "member" &&
        props.user !== "memberSecond" &&
        props.text &&  
        <ChatBubble {...props} key={"bubble_" + props.id}  />
}
      {props.type === "text" && props.user === "memberSecond" && props.text && (
        
         <ChatBubbleSecond {...props} key={"bubble_" + props.id} />
      
      )}
      {props.type === "text" && props.user === "member" && props.text && (
        <UserMessage {...props} key={"member_" + props.id} firstName={"You"} />
      )}
      {props.type === "alert" && props.text && (
        <Notification {...props} key={"notify_" + props.id} />
      )}
      {props.type === "photo" && (
        <PhotoMessage {...props} key={"image_" + props.id} />
      )}
      {(props.type === "file" || props.type === "pdf") && (
        <>
        {<FileMessage {...props} key={"file_" + props.id} />}
        </>
      )}
      {(props.type === "action" || props.type === "prompt") && (
        <ActionCard
          {...props}
          key={"prompt_" + props.id}
          onSelect={(value: string) => onSelect(value)}
        />
      )}
      {props.type === "choice" && (
        <MultiSelectCard {...props} key={"choice_" + props.id} />
      )}
      {props.type === "address" && (
         <>
        <Address {...props} key={"address_" + props.id} />
        </>
      )}
      {props.type === "confirmation" && (
        <Confirmation {...props} key={"confirm_" + props.id} />
      )}
      <MessageBoxComponent {...props} />
    </div>
  );
};

export default MessageBox;
