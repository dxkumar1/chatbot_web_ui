import React from 'react'
//
import { IPhotoMessageProps } from "../../../shared";
const { Button

}=require('@sentaraui/optimahealth_web/dist');



const PhotoMessage = (props: IPhotoMessageProps) => {
  const { tabIndex = 0} = props;
  return (
    <div tabIndex={tabIndex + 1} aria-label="Photo Message Wrapper" role="contentinfo" data-testid="photo_message">
      <div>
        {/* <Image
          src={props?.uri || ""}
          alt={props?.alt || ""}
          title={props?.alt || ""}
          onClick={props.onOpen}
          onLoad={props.onLoad}
          onError={props.onPhotoError}
          width={100}
          tabIndex={0}
          height={100}
        /> */}
        {props?.status && (
          <div>
              <Button role="button" aria-label="Download" tabIndex={tabIndex + 1} data-testid="btn_download" onClick={props.onDownload}>Download</Button>
          </div>
        )}
      </div>
      {props?.text && <div role="contentinfo" aria-label={props.text} tabIndex={tabIndex + 1} data-testid="text">{props.text}</div>}
    </div>
  )
}

export default PhotoMessage;
