import { ChatBubble } from '../../atoms'
import moment from 'moment';
import React, { useEffect, useRef } from 'react'
import { END_SESSION_INACTIVITY, END_SESSION_MESSAGE, THANK_YOU, EXIT } from '../../../shared/utils/strings';
const { Button }= require('@sentaraui/optimahealth_web/dist');

const EndSession: React.FC<any> = ({ onExit, isIdle = false, isTimedOut = false,surveyReducer }) => {
    const startTime = moment().format("hh:mm A");
    const messageRef = useRef<HTMLInputElement>(null)
    const surveyRef = useRef<HTMLIFrameElement>(null)
    useEffect(() => {
        if (messageRef && messageRef.current && messageRef?.current?.scrollIntoView) {
        messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
      },[]);

      useEffect(() => {
        if(surveyReducer?.surveyLink.length > 0){
        if (surveyRef && surveyRef.current && surveyRef?.current?.scrollIntoView) {
            surveyRef?.current?.scrollIntoView({ behavior: 'smooth' });
        }
    }
      },[surveyReducer?.surveyLink]);

    return (
        <div className='endSession-container' data-testid="endSession-container" role={"contentinfo"} tabIndex={9997}>
            <div className='inactive-message-view' >
                {isIdle && <>
                    <span aria-label={END_SESSION_INACTIVITY} role="contentinfo" tabIndex={9997} className='end-session-message redhat_semibold'><i>{END_SESSION_INACTIVITY}</i></span></>}
            </div>
            {!isTimedOut &&  <span aria-label={END_SESSION_MESSAGE} role="contentinfo" tabIndex={9997} className='end-session-message redhat_semibold'><i>{END_SESSION_MESSAGE}</i></span>}
            <ChatBubble tabIndex={9994} text={THANK_YOU} dateString={startTime} id={''} messageId={''} title={''} focus={false} date={0} user={'member'} status={'delivered'} />

           {surveyReducer?.surveyLink.length > 0  && <iframe ref={surveyRef} src={surveyReducer.surveyLink} width="100%" height="500"  className='survey-iframe'/>}
            <div className='survey-container' >
           
                <div tabIndex={9997} data-testid="survey_icon_btn" className='survey-btn-container' >
                    <div className="survey-padding" />
                    <Button
                        title={EXIT}
                        data-testid="btn_exit"
                        className={"day survey-padding exit-button"}
                        role="button"
                        tabIndex={9997}
                        aria-label={EXIT}
                        onClick={onExit}>
                        <span>{EXIT}</span>
                    </Button>
                    <div className="survey-padding" />
                    <div ref={messageRef} />
                </div>
            </div>
        </div>
    )
};

export default EndSession;
