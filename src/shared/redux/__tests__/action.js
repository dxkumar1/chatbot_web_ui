import ActionTypes from "../../types/actionTypes"
import { GetMessagesProps, GetDownloadTranscript, SessionProps } from '../../types/interfaces';
import { downloadTranscript, getMessages, setSession, setSessionAttributes, updateMessagesCount, updateSendMessageError, updateSentMessage } from "../action";

it("should test getMessages action", () => {
    const messages = {};
    const count = 0;
    const actionReturnValue = getMessages(messages, count);

    expect(actionReturnValue.type).toEqual("GET_MESSAGES");
    // expect(actionReturnValue.data.messages).toEqual(messages);
});

it("should test updateSentMessage action", () => {
    const messages = {};
    const actionReturnValue = updateSentMessage(messages);

    expect(actionReturnValue.type).toEqual("SENT_MESSAGE");
    
});

it("should test updateSendMessageError action", () => {
    const messages = {};
    const actionReturnValue = updateSendMessageError(messages);

    expect(actionReturnValue.type).toEqual("SENT_MESSAGE_ERROR");
    
});
it("should test updateMessagesCount action", () => {
    const count = 0;
    const actionReturnValue = updateMessagesCount(count);   
    expect(actionReturnValue.type).toEqual("GET_COUNT");
    expect(actionReturnValue.value).toEqual(undefined);
    
});
it("should test setSession action", () => {
    const session = {};
    const actionReturnValue = setSession(session);

    expect(actionReturnValue.type).toEqual("SET_SESSION");
    
});

describe("should test setSessionAttributes action", () => {
     it("should SET_SESSION_ATTRIBUTES", () => {
        const type = ActionTypes.ActionSetSession.SET_SESSION_ATTRIBUTES;
        const value={}
        const actionReturnValue = setSessionAttributes(type, value);
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should return SET_SESSION_ID", () => {
        const actionReturnValue = setSessionAttributes(ActionTypes.ActionSetSession.SET_SESSION_ID, 'ca9666fa-8ec9-4430-9c17-04cd12e4e643');
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
        //expect(actionReturnValue.type).toBe("SET_SESSION_ID");
        //expect(actionReturnValue.value).toEqual({sessionId:"ca9666fa-8ec9-4430-9c17-04cd12e4e643" });
   });
      it("should SET_MODAL_TYPE is sessionTransfer", () => {
        const actionReturnValue = setSessionAttributes(ActionTypes.ActionSetSession.SET_MODAL_TYPE, 'sessionTransfer');
        //expect(actionReturnValue.type).toBe("SET_MODAL_TYPE");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
        
      });
      it("should SET_MODAL_TYPE is CallAgent", () => {
        const type = "SET_MODAL_TYPE";
        const value='CallAgent'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_MODAL_TYPE");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
      it("should SET_MODAL_TYPE is timeout", () => {
        const type = "SET_MODAL_TYPE";
        const value=' '
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_MODAL_TYPE");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
      it("should SET_MODAL_TYPE is survey", () => {
        const type = "SET_MODAL_TYPE";
        const value='survey'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_MODAL_TYPE");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
      it("should SET_MODAL_TYPE is endSessionModal", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_MODAL_TYPE");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    
    
      it("is SET_SESSION_ENDED true", () => {
        const type = "SET_SESSION_ENDED";
        const value=true;
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SESSION_ENDED");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
      it("is SET_SESSION_ENDED true", () => {
        const type = "SET_SESSION_ENDED";
        const value=false;
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SESSION_ENDED");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_TIMED_OUT", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_TIMED_OUT");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_SHOW_TIMEOUT_MODAL", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SHOW_TIMEOUT_MODAL");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_SESSION_ENDED_BY_USER", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SESSION_ENDED_BY_USER");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_SESSION_ENDED_BY_BOT", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SESSION_ENDED_BY_BOT");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_SESSION_ENDED_BY_AGENT", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SESSION_ENDED_BY_AGENT");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_WAITING_FOR_AGENT", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_WAITING_FOR_AGENT");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_AGENT_REQUEST_CANCELED", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_AGENT_REQUEST_CANCELED");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_CONNECTED_WITH_AGENT", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_CONNECTED_WITH_AGENT");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_SESSION_TRANSFER", () => {
        const type = "SET_MODAL_TYPE";
        const value='endSessionModal'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SESSION_TRANSFER");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_TRANSFER_TYPE", () => {
        const type = "SET_TRANSFER_TYPE";
        const value='transfer'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_TRANSFER_TYPE");
        //expect(actionReturnValue.value).toBe("transfer");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_TRANSFER_TYPE", () => {
        const type = "SET_TRANSFER_TYPE";
        const value='new'
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_TRANSFER_TYPE");
        // expect(actionReturnValue.value).toBe("new");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_SHOW_AGENT_TYPING", () => {
        const type = "SET_SHOW_AGENT_TYPING";
        const value=true;
        const actionReturnValue = setSessionAttributes(type, value);
        // expect(actionReturnValue.type).toBe("SET_SHOW_AGENT_TYPING");
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
    it("should SET_MESSAGE_LOADING", () => {
        const actionReturnValue = setSessionAttributes(ActionTypes.ActionSetSession.SET_MESSAGE_LOADING, false);
        // expect(actionReturnValue.type).toBe("SET_MESSAGE_LOADING");
        // expect(actionReturnValue.value).toEqual({messageLoading:false});
        expect(actionReturnValue.type).toBe("SET_SESSION_ATTRIBUTES");
      });
   
});
it("should test downloadTranscript action", () => {
    
    const API_URL = 'https://webapi.sentara.com/uat1/optimamember/v1/chat',
        API_KEY = 'ea8c672e5f61415ab590975f575f8d35',
        userId = 'Q2xhdWRpYV90ZXN0',
        sessionId = 'ca9666fa-8ec9-4430-9c17-04cd12e4e643',
        authToken = 'IiboXcSKVdCO7bgUO1OIr3R92qze',
        onSuccess = jest.fn();
    const actionReturnValue = downloadTranscript(API_URL, API_KEY, userId, sessionId, authToken, onSuccess,);

    expect(actionReturnValue.type).toEqual("DOWNLOAD_MESSAGE");
    
});