import React from 'react'
import { IFileMessageProps } from "../../../shared"
const { Button }=require('@sentaraui/optimahealth_web/dist');

const FileMessage = (props: IFileMessageProps) => {

  const onClick = (e: React.MouseEvent) => {
  }
  const { tabIndex = 0} = props;

  return (
    <div>
      { <Button aria-label="Download Icon" role="button" tabIndex={tabIndex + 1} onClick={onClick}>
        <div tabIndex={tabIndex + 1}  aria-label={props?.data?.size}><div>{props?.data?.size}</div></div>
        <div tabIndex={tabIndex + 1}  aria-label={props.text}>{props.text}</div>
        <div tabIndex={tabIndex + 1}  aria-label={"Download Icon"}>Download Icon</div>
      </Button>}
    </div>
  )
};
export default FileMessage;